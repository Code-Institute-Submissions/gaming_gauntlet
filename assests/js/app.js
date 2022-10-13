const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let bricks = []

let brickRowCount = 8
let brickColumnCount = 4

//Create Ball
const ball = {
    x: canvas.width / 2 ,
    y: canvas.height / 2,
    diameter: 5,
}

console.log(canvas.width)

// Create Paddle

const paddle = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 10,
    width: 50,
    height: 5
}

// Draw individual items 

function drawBall() {
    ctx.arc(ball.x, ball.y, ball.diameter, 0, Math.PI * 2)
    ctx.fillStyle = '#585959'
    ctx.fill()
}

function drawPaddle() {
    ctx.beginPath()
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height)
    ctx.fillStyle = '#585959'
    ctx.fill()
    ctx.closePath()
}

// Call all draw functions

function draw() {
    drawBall()
    drawPaddle()
}

draw()
