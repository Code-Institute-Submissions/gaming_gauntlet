const questionEl = document.getElementById('question')
const answersEl = document.getElementById('answers')
let answerBtns 

const URLArr = [
    'https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=multiple',
    'https://opentdb.com/api.php?amount=5&category=15&difficulty=medium&type=multiple',
    'https://opentdb.com/api.php?amount=5&category=15&difficulty=hard&type=multiple',
    'https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple',
    'https://opentdb.com/api.php?amount=5&category=18&difficulty=hard&type=multiple'
]

let quizQuestions 

let currentQuestion = 0
let correctAnswer 
let score = 0

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
            console.log(data.results)
            questionEl.innerHTML = `<div id="question">${data.results[currentQuestion].question}</div>
            `
            const answers = [...data.results[currentQuestion].incorrect_answers, data.results[currentQuestion].correct_answer]

            correctAnswer = data.results[currentQuestion].correct_answer

            shuffleArr(answers)
            console.log(answers)

            answersEl.innerHTML = `
            <button class="quiz-btn">${answers[0]}</button>
            <button class="quiz-btn">${answers[1]}</button>
            <button class="quiz-btn">${answers[2]}</button>
            <button class="quiz-btn">${answers[3]}</button>
            `
            console.log(correctAnswer)
            answerBtns = document.querySelectorAll('.quiz-btn')

            answerBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {

                    console.log(e.target.innerText)
                    checkAnswer(e)
                } )
            })
        })
}

function checkAnswer(e) {
    if(e.target.innerText == correctAnswer) {
        console.log('correct')
        questionEl.innerText = 'Correct!'
        answersEl.innerHTML = ''
        currentQuestion += 1
        score += 1
        setTimeout(getQuiz, 2000)
    } else {
        console.log('incorrect')
        questionEl.innerText = 'incorrect X'
        answersEl.innerHTML = ''
        currentQuestion += 1
        score += 0
        setTimeout(getQuiz, 2000)
    }
}

   

getQuiz()




