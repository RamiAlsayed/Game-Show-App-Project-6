const overlay = document.getElementById('overlay');
const headline = overlay.querySelector('h2');
const startGame = overlay.querySelector('a');
const qwerty = document.querySelector('#qwerty');
const buttons = qwerty.querySelectorAll('button');
const phrase = document.getElementById('phrase');
const ul = phrase.firstElementChild;
const scoreboard = document.getElementById('scoreboard');
const hands = scoreboard.querySelectorAll('i');

// songs 
let phrases = [
    'Imagine',
    'One',
    'Billie Jean',
    'Bohemian Rhapsody',
    'Hey Jude',
    'Like A Rolling Stone',
    'Yesterday',
    'Every Breath You Take',
    'A Day In The Life',
    'God Only Knows'
];

// Get Random songs Function 
getRandomPhrase = (song) => {
    let randomPhrase = song[Math.floor(Math.random() * song.length)];
    return randomPhrase.split('');
}

const phraseArray = getRandomPhrase(phrases);



addPhraseToDisplay = (song) => {
    for (let i = 0; i < song.length ; i ++ ) {
        let listElement = document.createElement('li');
        listElement.textContent = song[i];
        if (listElement.textContent === " ") {
            listElement.className = 'space';
            ul.appendChild(listElement);
        } else {
            listElement.className = 'letter';
            ul.appendChild(listElement);
        }
    }
}
addPhraseToDisplay(phraseArray);

// Button click
checkLetter = (guess) => {
    let letterFound = null;
    const letter = document.getElementsByClassName('letter');
    for (i = 0; i < letter.length; i += 1) {
        if (letter[i].textContent.toLowerCase() === guess){
            letter[i].classList.add('show');
            letterFound = true;
        } 
    }
    return letterFound;
}

let missed = 0;

// Checks  User won or lost the game

checkWin = () => {
    const shown = document.getElementsByClassName('show');
    const letter = document.getElementsByClassName('letter');
    if (letter.length === shown.length) {
        overlay.className = "win";
        overlay.style.display = "flex";
        headline.textContent = "WOW , You Win!";
        startGame.textContent = "Play Again";
    } else if (missed === 5) {
        overlay.className = 'lose';
        overlay.style.display = "flex";
        headline.textContent = "Sorry , Play Again";
        startGame.textContent = "Try Again";
    }
}




qwerty.addEventListener('click', (event) => {
    if (event.target.type === 'submit') {
        event.target.classList.add('chosen');
        event.target.disabled = "true";
        let guess = event.target.textContent;
        const match = checkLetter(guess);
        if (match != true) {
        missed ++;
        hands[hands.length - missed].className="far fa-heart";  
       }
    checkWin();
    }
})

// //  Resets the game after a win or loss
startGame.addEventListener('click', () => {
    overlay.className = "start";
    missed = 0;
    ul.textContent = '';
    for (i = 0; i < buttons.length; i += 1) {
        buttons[i].removeAttribute('class');
        buttons[i].removeAttribute('disabled');
    } 
    for (i = 0; i < hands.length; i += 1) {
        hands[i].className="fas fa-heart";
    }
    const phraseArray = getRandomPhrase(phrases);
    addPhraseToDisplay(phraseArray);
    overlay.style.display = "none";
});