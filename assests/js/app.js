/* jshint esversion: 11 */

let scoreMultiplier = 1
let totalScore = 0
let difficulty = 1
let gamesPlayed = 0

//decide primary color
let primaryColor 

function colorPicker() {
    const root = document.querySelector(':root')
    if(document.title == "Gaming Gauntlet || Breakout") {
        root.style.setProperty('--primary-color', '#D6347B')
        primaryColor = '#D6347B'
    } else if(document.title == "Gaming Gauntlet") {
        root.style.setProperty('--primary-color', '#585959')
        primaryColor = '#585959'
    } else if(document.title == "Gaming Gauntlet || Quiz") {
        root.style.setProperty('--primary-color', '#16A085')
        primaryColor = '#16A085'
    } else if(document.title == "Gaming Gauntlet || Guess The Number") {
        root.style.setProperty('--primary-color', '#FF9023')
        primaryColor = '#FF9023'
    }
}

colorPicker()

// Index screen functionality 

const homeScreens = document.querySelectorAll('.info-screen')
const screenFlex = document.querySelector('.info-flex')
const leftTutorialBtns  = document.querySelectorAll('.tutorial-left')
const rightTutorialBtns  = document.querySelectorAll('.tutorial-right')
let homeScreenNumber = 0

// homeScreens.forEach(screen => {
//     screen.addEventListener('click', (e) => {
//         console.log(e.target)
//         if (e.target.className === 'fa fa-chevron-right' && homeScreenNumber <= 5) {
//             screenFlex.style.transform = 'translateX(-16.6666%)'
//         }

//         if (e.target.className === 'fa fa-chevron-left' && homeScreenNumber >= 1) {
//             screenFlex.style.transform = 'translateX(16.6666%)'
//         }
        
//     })
// })



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

localStorage.setItem('breakoutPlayed', 'false')
localStorage.setItem('guessPlayed', 'false')
localStorage.setItem('quizPlayed', 'false')

