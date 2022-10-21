const numberBox = document.getElementById('number-box')
const hint = document.getElementById('guess-hint')
const numberInput = document.getElementById('number-input')
const guessesLeft = document.getElementById('guesses-left')
const winLoseScreen = document.getElementById('win-lose-screen')

let lives = 3
const randomNum = getRandomNumber()

console.log(randomNum)

function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1
}

function checkAnswer(e) {
    if (e.key === "Enter") {
        // if game is won
        if(numberInput.value == randomNum) {
            totalScore = totalScore + (scoreMultiplier * 100)
        scoreMultiplier += 1
        difficulty += 1
        winLoseScreen.style.display = 'flex'
        winLoseScreen.innerHTML = `
        <<h2>Congrats you've won!</h2>
        <h2>Current Score : ${totalScore}</h2>
        <h2>Current current multiplier : x${scoreMultiplier}</h2>
        <h2> choose your next game or retstart from scratch! </h2>
        <a class="restart-button" href="index.html">Restart Gauntlet</a>
        <div class="crt crt-overlay"></div>
        `
        } else if (numberInput.value < randomNum) {
            lives += -1
            guessesLeft.innerText = `${lives}`
            hint.innerHTML = `
            <h2>Go Higher</h2>
            `
        } else if (numberInput.value > randomNum) {
            lives += -1
            console.log(lives)
            guessesLeft.innerText = `${lives}`
            hint.innerHTML = `
            <h2>Go Lower</h2>
            `
        } else if (lives < 0) {
            scoreMultiplier = 1
            difficulty = 1
            winLoseScreen.style.display = 'flex'
            winLoseScreen.innerHTML = `
            <h2>Your Score multiplyer and difficulty have been reset!</h2>
            <h2>Current Score : ${totalScore}</h2>
            <h2>Current current multiplier : x${scoreMultiplier}</h2>
            <h2> choose your next game or retstart from scratch! </h2>
            <a class="restart-button" href="index.html">Restart Gauntlet</a>
            <div class="crt crt-overlay"></div>
            `
        }
    }
}

numberInput.addEventListener('keypress', checkAnswer)