const questionEl = document.getElementById('question')
const answersEl = document.getElementById('answers')

const URLArr = [
    'https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=multiple',
    'https://opentdb.com/api.php?amount=5&category=15&difficulty=medium&type=multiple',
    'https://opentdb.com/api.php?amount=5&category=15&difficulty=hard&type=multiple',
    'https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple',
    'https://opentdb.com/api.php?amount=5&category=18&difficulty=hard&type=multiple'
]

let quizQuestions 

let s

let currentQuestion = 0

function shuffleArr(arr) {
    console.log(arr)
    for (let i = arr.length - 1; i >= 0; i--) {
        s = Math.floor(Math.random() * (i + 1))
        [arr[i], arr[s]] = [arr[s], arr[i]]
    }
    console.log(arr)
}

async function getQuiz() {
    await fetch(URLArr[difficulty + 2])
        .then(res => res.json())
        .then(data => {
            console.log(data.results)
            questionEl.innerHTML = `<div id="question">${data.results[currentQuestion].question}</div>
            `
            const answers = [...data.results[currentQuestion].incorrect_answers, data.results[currentQuestion].correct_answer]

            shuffleArr(answers)

            answersEl.innerHTML = `
            
            `
        })
}

function addQuizToDOM() {
   
   


}

getQuiz()

addQuizToDOM()


