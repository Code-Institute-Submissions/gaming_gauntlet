/* jshint esversion: 11 */

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const singleBlock = 10

const rows = canvas.height / singleBlock
const columns = canvas.width / singleBlock

// Snake class 

class Snake {
    constructor() {
        this.x = 20;
        this.y = 20;
        this.xSpeed = singleBlock * 1
        this.ySpeed = 0
    }

    drawSnake() {
        ctx.fillStyle = primaryColor
        ctx.fillRect(this.x, this.y, singleBlock, singleBlock)
    }

    update() {
        snake.x += snake.xSpeed
        snake.y += snake.ySpeed 
    }
}

// Init and setup snake 

let snake 

function setup() {
    snake = new Snake
    snake.drawSnake()

    setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snake.drawSnake()
        snake.update()
    }, 250)
}

// function update() {
//     snake.x += snake.xSpeed
//     snake.y += snake.ySpeed

//      //clear canvas 
//     ctx.clearRect(0, 0, canvas.width, canvas.height)

//     //draw again
//     snake.drawSnake()


//     requestAnimationFrame(update)
// }

setup()


