/* jshint esversion: 11 */

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const singleBlock = 10

const rows = canvas.height / singleBlock
const columns = canvas.width / singleBlock

let lives = 3

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

        //Check for game over by hitting edge
        if (this.x > canvas.width ||
            this.x < 0 ||
            this.y > canvas.height ||
            this.y < 0) {
                this.x = 20;
                this.y = 20

                this.xSpeed = singleBlock * 1
                this.ySpeed = 0
                
                lives += -1
                console.log(lives)
        }
    }

    changeDirection(direction) {
        switch(direction) {
            case 'Up':
                this.xSpeed = 0
                this.ySpeed = singleBlock * -1
            break;
            case 'Right':
                this.xSpeed = singleBlock * 1
                this.ySpeed = 0
            break;
            case 'Down':
                this.xSpeed = 0
                this.ySpeed = singleBlock * 1
            break;
            case 'Left':
                this.xSpeed = singleBlock * -1
                this.ySpeed = 0
            break;
        }
    }
}

// Init and setup snake 

let snake;

function setup() {
    snake = new Snake
    snake.drawSnake()

    setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snake.drawSnake()
        snake.update()
    }, 200)
}



setup()

// Event listeners for movement 

window.addEventListener('keydown', (e) => {
    console.log(e)
    const direction = e.key.replace('Arrow', '')
    snake.changeDirection(direction)
})
