/***** Input + start btn *****/

/* variables */

let underscore = document.querySelector('.underscore')
let secretWordText = document.createTextNode('');
underscore.appendChild(secretWordText);

let userText = document.querySelector('.userText');
let fails = document.querySelector('.fail')
let illustration = document.querySelector('.illustration');
let keyboard = document.querySelector('.keyboard');

let secretWord = []; // stockage du mot secret
let findWord = []; // stockage du mot à deviner
let letterUsed = []; // stockage des lettres du clavier
let life = 3;


/* Start btn fonction */

let btnStart = document.querySelector('.btnStart');
btnStart.dataset.state = 'start'; // on crée un dataset que l'on appelle "state" avec la valeur "start";

btnStart.addEventListener('click', () => {

	let enterWord = null;

	switch (btnStart.dataset.state) {

		case 'start':

			do {
				enterWord = prompt('Enter secret word : ').toUpperCase();
			} while (enterWord.length <= 3);

			secretWord = enterWord.split(''); // devient un tableau avec 'split'
			btnStart.textContent = 'Restart Game';
			btnStart.dataset.state = 'restart'; // on change l'attribut du bouton.

			for (let i = 0; i < secretWord.length; i++) {
				findWord.push('_'); // création des _ en fonction du nombre de lettres dans le mot secret
			}

			displayKeyboard(); // appelle du keyboard
			secretWordText.textContent = findWord.join(' ');
			// on rassemble les caractères et on les affiche.
			break;

		case 'restart':
			document.location.reload(); //recharge la page.
			break;

	}

});

/********** Claviers **********/

/*** Clavier physique ***/

let alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');

window.addEventListener('keyup', (e) => {
	if (findWord.length == 0) {
		return; // empêche le démarrage
	}

	let key = e.key.toUpperCase();
	let keyPosition = alphabet.indexOf(key); // on recherche l'index de la lettre

	if (keyPosition != -1) {
		keyboard.childNodes[keyPosition].style.backgroundColor = "red";
	}

	comparer(key);

});

/*** Clavier virtuel ***/

function displayKeyboard() {

	for (let i = 0; i < alphabet.length; i++) {

		let div = document.createElement('div');
		div.className="keybord_btn";
		div.textContent = alphabet[i];
		keyboard.appendChild(div);
		div.style.border = '1px solid black';

		div.addEventListener('click', () => {
			let clicked = div.textContent;
			let clickedPos = alphabet.indexOf(clicked);
			console.log(clicked);
			comparer(clicked); // appelle la fonction comparer avec en paramètre le click souris.
			keyboard.childNodes[clickedPos].style.backgroundColor = "red";
		});
	}
}


function comparer(letter) {

	if (life == 0) {
		return;
	}

	if (letterUsed.includes(letter)) {
		alert("Vous avez déjà proposé cette lettre");
	} else {

		let find = false;
		letterUsed.push(letter); // on push la lettre des claviers dans le tableau letterUsed.
		
		for (let y = 0; y < secretWord.length; y++) { //on cherche dans le mot secret
			if (secretWord[y] == letter) { // si 
				findWord[y] = letter;
				find = true;
			}
		}

		if (find) {
			//rien
		} else {
			life--;
			illustration.src = `img/fail${life}.png`;
			if (life == 0) {
					userText.textContent = 'Hanged !';
					userText.style = "font-weight : bold; background-color: crimson";
					keyboard.disabled = true;
			}
		}
		fails.textContent = `vies restantes : ${life}`;
		secretWordText.textContent = findWord.join(' ');
	}
}


/* test */
window.addEventListener("load", () => {
	console.log("Ready to be Hanged ?");
});