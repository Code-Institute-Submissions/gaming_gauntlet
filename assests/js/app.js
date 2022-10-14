const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let bricks = []

let brickRowCount = 8
let brickColumnCount = 4

//Single brick properties
const singleBrick = {
    visible: true, 
    offsetX: 30,
    offsetY: 20,
    width: 25,
    height: 5,
    padding: 5
}

//Create Ball
const ball = {
    x: canvas.width / 2 ,
    y: canvas.height / 2,
    diameter: 4,
}

console.log(canvas.width)

// Create Paddle

const paddle = {
    x: canvas.width / 2 - 20,
    y: canvas.height - 10,
    width: 40,
    height: 5
}

//Create individual bricks 

for (let i = 0; i < brickRowCount; i++) {
    bricks[i] = []
    for (let j = 0; j < brickColumnCount; j++) {
        x = i * (singleBrick.width + singleBrick.padding)  + singleBrick.offsetX
        y = j * (singleBrick.height + singleBrick.padding) + singleBrick.offsetY 
        bricks[i][j] = { x, y, ...singleBrick }
    }
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

function drawBricks() {
    bricks.forEach(row => {
        row.forEach(brick => {
            ctx.beginPath()
            ctx.rect(brick.x, brick.y, brick.width, brick.height)
            ctx.fillStyle = '#585959'
            ctx.fill()
            ctx.closePath()
        })
    })
}

// Call all draw functions

function draw() {
    drawBall()
    drawPaddle()
    drawBricks()
}

draw()
