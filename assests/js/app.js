/* jshint esversion: 11 */

const gameLinks = document.querySelectorAll('a');

let scoreMultiplier = 1;
let totalScore = 0;
let difficulty = 5;
let gamesPlayed = 0;
let currentPath = window.location.pathname.split(/[\/]/).pop();


//decide primary color

let primaryColor;

function colorPicker() {
    const root = document.querySelector(':root');

    if (currentPath == `breakout.html`) {
        root.style.setProperty('--primary-color', '#D6347B');
        primaryColor = '#D6347B';
    } else if (currentPath == `/index.html`) {
        root.style.setProperty('--primary-color', '#585959');
        primaryColor = '#585959';
    } else if (currentPath == `quiz.html`) {
        root.style.setProperty('--primary-color', '#16A085');
        primaryColor = '#16A085';
    } else if (currentPath == `number_guess.html`) {
        root.style.setProperty('--primary-color', '#FF9023');
        primaryColor = '#FF9023';
    } else if (currentPath == `snake.html`) {
        root.style.setProperty('--primary-color', '#89ae00');
        primaryColor = '#89ae00';
    } else if (currentPath == `pacman.html`) {
        root.style.setProperty('--primary-color', '#6820ab');
        primaryColor = '#6820ab';
        document.body.style.color = '#6820ab'
    }
}

colorPicker();

//draw variables out of local storage
function getVariables() {
    scoreMultiplier = parseInt(localStorage.getItem('scoreMultiplier'));
    difficulty = parseInt(localStorage.getItem('difficulty'));
    totalScore = parseInt(localStorage.getItem('totalScore'));
    gamesPlayed = parseInt(localStorage.getItem('gamesPlayed'));
}

// set Variables after game concludes
function setVariables() {
    localStorage.setItem('difficulty', difficulty);
    localStorage.setItem('scoreMultiplier', scoreMultiplier);
    localStorage.setItem('totalScore', totalScore);
    localStorage.setItem('gamesPlayed', gamesPlayed);
}

// Check if all games have been played for final screen

function AllGamesPLayed() {
    if (gamesPlayed == 4) {
        winLoseScreen.style.display = 'flex';
        winLoseScreen.innerHTML = `
        <h2>Congrats you finished the gauntlet!</h2>
        <h2>Current Score : ${totalScore}</h2>
        <h2>Current current multiplier : x${scoreMultiplier}</h2>
        <h2> the highest possible score is 1000! how close did you get?</h2>
        <h2>Are you ready to brave the gauntlet again?</h2>
        <a class="restart-btn" href="index.html">Restart Gauntlet</a>
        `;
    }
}

// Index screen functionality 

const screenFlex = document.querySelector('.info-flex');
const leftTutorialBtns  = document.querySelectorAll('.tutorial-left');
const rightTutorialBtns  = document.querySelectorAll('.tutorial-right');
let homeScreenNumber = 0;


let infoXPosition = 0;
let infoXInterval = 16.6666;

leftTutorialBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (homeScreenNumber >= 1) {
            screenFlex.style.transform = `translateX(${infoXPosition + infoXInterval}%)`;
            homeScreenNumber += -1;
            infoXPosition += infoXInterval;
        }
    });
});

rightTutorialBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (homeScreenNumber <= 4) {
            screenFlex.style.transform = `translateX(${infoXPosition - infoXInterval}%)`;
            homeScreenNumber += 1;
            infoXPosition -= infoXInterval;
        }
    });
});

// set local storage to know if any game has been played yet

window.addEventListener('load', () => {
    if (currentPath == `index.html`) {
        localStorage.setItem('breakoutPlayed', 'false');
        localStorage.setItem('guessPlayed', 'false');
        localStorage.setItem('quizPlayed', 'false');
        localStorage.setItem('snakePlayed', 'false');
        localStorage.setItem('difficulty', '1');
        localStorage.setItem('scoreMultiplier', '1');
        localStorage.setItem('totalScore', '0');
        localStorage.setItem('gamesPlayed', '0');
    }

    if (localStorage.getItem('snakePlayed') === 'true') {
        gameLinks[1].style.background = '#585959';
        gameLinks[1].style.color = '#000';
        gameLinks[1].href = '#';
    }

    if (localStorage.getItem('breakoutPlayed') === 'true') {
        gameLinks[2].style.background = '#585959';
        gameLinks[2].style.color = '#000';
        gameLinks[2].href = '#';
    }

    if (localStorage.getItem('guessPlayed') === 'true') {
        gameLinks[3].style.background = '#585959';
        gameLinks[3].style.color = '#000';
        gameLinks[3].href = '#';
    }
    if (localStorage.getItem('quizPlayed') === 'true') {
        gameLinks[4].style.background = '#585959';
        gameLinks[4].style.color = '#000';
        gameLinks[4].href = '#';
    }
    
});
