/* jshint esversion: 11 */


const questionEl = document.getElementById('question')
const answersEl = document.getElementById('answers')
const winLoseScreen = document.getElementById('win-lose-screen')
let answerBtns 

const URLArr = [
    'https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple',
    'https://opentdb.com/api.php?amount=10&category=15&difficulty=medium&type=multiple',
    'https://opentdb.com/api.php?amount=10&category=15&difficulty=hard&type=multiple',
    'https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple',
    'https://opentdb.com/api.php?amount=10&category=18&difficulty=hard&type=multiple'
]

let quizQuestions 

let currentQuestion = 0
let correctAnswer 
let quizScore = 0

function shuffleArr(arr) {
    for (let i = 0; i < arr.length; i++) {
       let temp = arr[i]
       let j = Math.floor(Math.random() * arr.length)
       arr[i] = arr[j]
       arr[j] = temp

       return arr
    }

}

async function getQuiz() {
    await fetch(URLArr[difficulty - 1])
        .then(res => res.json())
        .then(data => {
            questionEl.innerHTML = `<div id="question">${data.results[currentQuestion].question}</div>
            `
            const answers = [...data.results[currentQuestion].incorrect_answers, data.results[currentQuestion].correct_answer]

            correctAnswer = data.results[currentQuestion].correct_answer

            shuffleArr(answers)

            answersEl.innerHTML = `
            <button class="quiz-btn">${answers[0]}</button>
            <button class="quiz-btn">${answers[1]}</button>
            <button class="quiz-btn">${answers[2]}</button>
            <button class="quiz-btn">${answers[3]}</button>
            `
            answerBtns = document.querySelectorAll('.quiz-btn')

            answerBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    checkAnswer(e)
                } )
            })
        })
}

function checkAnswer(e) {
    if(e.target.innerText == correctAnswer) {
        questionEl.innerText = 'Correct!'
        answersEl.innerHTML = ''
        currentQuestion += 1
        quizScore += 1
        if (currentQuestion < 10) {
        setTimeout(getQuiz, 1000)
        }  else  {
            setTimeout(checkWinLose, 1000)
        }
    } else {
        questionEl.innerText = 'incorrect X'
        answersEl.innerHTML = ''
        currentQuestion += 1
        quizScore += 0
        if (currentQuestion < 5) {
            setTimeout(getQuiz, 1000)
        } else  {
            setTimeout(checkWinLose, 1000)
        }
    }
}


function checkWinLose() {
    if (currentQuestion === 10 && quizScore >= 6) {
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
            localStorage.setItem('quizPlayed', 'true') 
        
    } else {
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
        localStorage.setItem('quizPlayed', 'true') 
    }
}

getQuiz()




