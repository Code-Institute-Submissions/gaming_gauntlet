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
    height: 5,
    speed: 8,
    xDirection: 0
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

// paddle movement  
function movePaddle() {
    paddle.x += paddle.xDirection

    if (paddle.x < 0) {
        paddle.x = 0
    }

    if (paddle.x > canvas.width - paddle.width) {
        paddle.x = canvas.width - paddle.width
    }
}

// Call all draw functions

function draw() {
    drawBall()
    drawPaddle()
    drawBricks()
}

function update() {
    //clear canvas every frame
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    draw()
    movePaddle() 
     

    requestAnimationFrame(update)
}


update()


//right and left arrow key functionality 
function keyDown(e) {
    if (e.key === 'ArrowLeft' || e.key === 'Left') {
        paddle.xDirection = - paddle.speed
        console.log('left')
    }

    if (e.key === 'ArrowRight' || e.key === 'Right') {
        paddle.xDirection =  paddle.speed
    }
}

function keyUp(e) {
    if(e.key === 'ArrowLeft' || e.key === 'Left' || e.key === 'ArrowRight' || e.key === 'Right') {
        paddle.xDirection = 0
    }
}

//Event listeners for left and right keys

window.addEventListener('keydown', keyDown)
window.addEventListener('keyup', keyUp)