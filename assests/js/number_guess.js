/* jshint esversion: 11 */

//Bring in DOM elements

const numberBox = document.getElementById('number-box')
const hint = document.getElementById('guess-hint')
const numberInput = document.getElementById('number-input')
const guessesLeft = document.getElementById('guesses-left')
const winLoseScreen = document.getElementById('win-lose-screen')
const span = document.getElementById('number-span')

//draw variables out of local storage

getVariables()

//init specific variables for number guess

let lives = 5 + (difficulty - 1)
let numberCounter = 0
let range = 20 * difficulty
const randomNum = getRandomNumber()
span.innerText = range

console.log(randomNum)

guessesLeft.innerText = lives


function getRandomNumber() {
    return Math.floor(Math.random() * range) + 1
}

function checkAnswer(e) {
    if (e.key === "Enter") {
        // if game is won
        if(numberInput.value == randomNum) {

        //create a function for winning
        totalScore = totalScore + (scoreMultiplier * 100)
        scoreMultiplier += 1
        difficulty += 1
        winLoseScreen.style.display = 'flex'
        winLoseScreen.innerHTML = `
        <h2>Congrats you've won!</h2>
        <h2>Current Score : ${totalScore}</h2>
        <h2>Current current multiplier : x${scoreMultiplier}</h2>
        <h2> choose your next game or retstart from scratch! </h2>
        <a class="restart-btn" href="index.html">Restart Gauntlet</a>
        <div class="crt crt-overlay"></div>
        `
        localStorage.setItem('guessPlayed', 'true')
        setVariables()

        } else if (numberInput.value < randomNum) {
            lives += -1
            guessesLeft.innerText = `${lives}`
            hint.innerText = `Go Higher!`
        } else if (numberInput.value > randomNum) {
            lives += -1
            guessesLeft.innerText = `${lives}`
            hint.innerText = `Go Lower!`
        }   else {

        }
        
        if (lives < 0) {
            scoreMultiplier = 1
            difficulty = 1
            winLoseScreen.style.display = 'flex'
            winLoseScreen.innerHTML = `
            <h2>Your Score multiplyer and difficulty have been reset!</h2>
            <h2>Current Score : ${totalScore}</h2>
            <h2>Current current multiplier : x${scoreMultiplier}</h2>
            <h2> choose your next game or retstart from scratch! </h2>
            <a class="restart-btn" href="index.html">Restart Gauntlet</a>
            <div class="crt crt-overlay"></div>
            `
            localStorage.setItem('guessPlayed', 'true')
            setVariables()
        }
        e.target.value = ''
    }
}

function addToCounter() {
    numberCounter += 1
    numberBox.innerText = `${numberCounter}`
    if(numberCounter === 100) {
        numberCounter = 0
    }
}

setInterval(addToCounter, 25)

numberInput.addEventListener('keypress', checkAnswer)