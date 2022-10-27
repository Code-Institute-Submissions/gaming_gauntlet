/* jshint esversion: 11 */

const gameLinks = document.querySelectorAll('a')

let scoreMultiplier = 1
let totalScore = 0
let difficulty = 1
let gamesPlayed = 0

//decide primary color
let primaryColor 

function colorPicker() {
    const root = document.querySelector(':root')
    if(document.location.pathname == "/breakout.html") {
        root.style.setProperty('--primary-color', '#D6347B')
        primaryColor = '#D6347B'
    } else if(document.location.pathname == "/index.html") {
        root.style.setProperty('--primary-color', '#585959')
        primaryColor = '#585959'
    } else if(document.location.pathname == "/quiz.html") {
        root.style.setProperty('--primary-color', '#16A085')
        primaryColor = '#16A085'
    } else if(document.location.pathname == "/number_guess.html") {
        root.style.setProperty('--primary-color', '#FF9023')
        primaryColor = '#FF9023'
    } else if(document.location.pathname == "/snake.html") {
        root.style.setProperty('--primary-color', '#89ae00')
        primaryColor = '#89ae00'
    }
}

colorPicker()

// set Variables after game concludes
function setVariables() {
    localStorage.setItem('difficulty', difficulty)
    localStorage.setItem('scoreMultiplier', scoreMultiplier)
    localStorage.setItem('totalScore', totalScore)
    localStorage.setItem('gamesPlayed', gamesPlayed)
    console.log(scoreMultiplier)
}

// Index screen functionality 

const homeScreens = document.querySelectorAll('.info-screen')
const screenFlex = document.querySelector('.info-flex')
const leftTutorialBtns  = document.querySelectorAll('.tutorial-left')
const rightTutorialBtns  = document.querySelectorAll('.tutorial-right')
let homeScreenNumber = 0


infoXPosition = 0
infoXInterval = 16.6666

leftTutorialBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (homeScreenNumber >= 1) {
            screenFlex.style.transform = `translateX(${infoXPosition + infoXInterval}%)`
            homeScreenNumber += -1
            infoXPosition += infoXInterval      
        }
    })
})

rightTutorialBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (homeScreenNumber <= 4) {
            screenFlex.style.transform = `translateX(${infoXPosition - infoXInterval}%)`
            homeScreenNumber += 1
            infoXPosition -= infoXInterval
        }
    })
})

// set local storage to know if any game has been played yet


window.addEventListener('load', () => {
    if (window.location.pathname == '/index.html') {
        localStorage.setItem('breakoutPlayed', 'false')
        localStorage.setItem('guessPlayed', 'false')
        localStorage.setItem('quizPlayed', 'false') 
        localStorage.setItem('difficulty', '1')
        localStorage.setItem('scoreMultiplier', '1')
        localStorage.setItem('totalScore', '0')
        localStorage.setItem('gamesPlayed', '0')
    }

    if (localStorage.getItem('breakoutPlayed') === 'true') {
        gameLinks[2].style.background = '#585959'
        gameLinks[2].style.color = '#000'
        gameLinks[2].href = '#'

    }

    if (localStorage.getItem('guessPlayed') === 'true') {
        gameLinks[3].style.background = '#585959'
        gameLinks[3].style.color = '#000'
        gameLinks[3].href = '#'

    }
    if (localStorage.getItem('quizPlayed') === 'true') {
        gameLinks[4].style.background = '#585959'
        gameLinks[4].style.color = '#000'
        gameLinks[4].href = '#'

    }
})



