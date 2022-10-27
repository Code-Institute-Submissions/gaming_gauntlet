/* jshint esversion: 11 */

//bring in needed DOM elements

const winLoseScreen = document.getElementById('win-lose-screen')

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// mobile touch buttons
const leftBtn = document.getElementById('left-arrow')
const rightBtn = document.getElementById('right-arrow')
const upBtn = document.getElementById('up-arrow')
const downBtn = document.getElementById('down-arrow')

// Define game parameters

const singleBlock = 20

const rows = canvas.height / singleBlock
const columns = canvas.width / singleBlock

let lives = 1
let score = 0
let gameOver = false

//draw variables out of local storage

getVariables()

// Snake class 

class Snake {
    constructor() {
        this.x = 20;
        this.y = 20;
        this.xSpeed = singleBlock * 1
        this.ySpeed = 0
        this.totalSize = 0
        this.tail = []
    }

    drawSnake() {
        ctx.fillStyle = primaryColor

        for (let i = 0; i < this.tail.length; i++) {
            ctx.fillRect(this.tail[i].x, this.tail[i].y, singleBlock, singleBlock)

        }

        ctx.fillRect(this.x, this.y, singleBlock, singleBlock)
    }

    update() {
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i+1]
        }

        this.tail[this.totalSize -1] = { x: this.x, y: this.y};


        snake.x += snake.xSpeed
        snake.y += snake.ySpeed 

        //Check for game over by hitting edge
        if (this.x >= canvas.width ||
            this.x < 0 ||
            this.y >= canvas.height ||
            this.y < 0) {
                this.x = 20;
                this.y = 20

                this.xSpeed = singleBlock * 1
                this.ySpeed = 0
              

                lives += -1
                score = 0
        }

        //Check for game over by hitting tail
        for (let i = 0; i < this.tail.length - 1; i++) {
            if (this.x === this.tail[i].x &&
                this.y === this.tail[i].y) {
                    this.x = 20;
                    this.y = 20

                    this.xSpeed = singleBlock * 1
                    this.ySpeed = 0
                   

                    lives += -1
                    score = 0
                }
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

    eat(food) {
        if (this.x === food.x &&
            this.y === food.y) {
                this.totalSize++
                return true
            } 
        return false
    }



}

// Food class

class Food {
    constructor() {
        this.x;
        this.y;
    }

    pickLocation() {
        this.x = (Math.floor(Math.random() * rows -1) +1 ) * singleBlock
        this.y = (Math.floor(Math.random() * columns -1) +1 ) * singleBlock
        console.log(this.x, this.y)
    }

    drawFood() {
        ctx.fillStyle = primaryColor
        ctx.fillRect(this.x, this.y, singleBlock, singleBlock)
    }
}

// Init and setup snake and food

let snake;
let food

function setup() {
    snake = new Snake
    food = new Food

    snake.drawSnake()
    food.pickLocation()
    

    //set speed of game through set interval

    const gameClock = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        food.drawFood()
        snake.drawSnake()
        snake.update()

        if(snake.eat(food)) {
            food.pickLocation()
            score++
        }

        // Game won state
        if (score >= 25) {
            gameOver = true        
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
            localStorage.setItem('snakePlayed', 'true')
            setVariables()
            clearInterval(gameClock)
            
        }

        // Game lost state
        if(lives < 0) {
            gameOver = true        
            canvas.style.display = 'none'
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
            localStorage.setItem('snakePlayed', 'true')
            setVariables()
            clearInterval(gameClock)
        }


    }, (200 / difficulty))



}



setup()



// Event listeners for movement 

window.addEventListener('keydown', (e) => {
    const direction = e.key.replace('Arrow', '')
    snake.changeDirection(direction)
})

// Mobile movement

leftBtn.addEventListener('touchstart', () => {
    snake.xSpeed = singleBlock * -1
    snake.ySpeed = 0
})

rightBtn.addEventListener('touchstart', () => {
    snake.xSpeed = singleBlock * 1
    snake.ySpeed = 0
})

upBtn.addEventListener('touchstart', () => {
    snake.xSpeed = 0
    snake.ySpeed = singleBlock * -1
})

downBtn.addEventListener('touchstart', () => {
    snake.xSpeed = 0
    snake.ySpeed = singleBlock * 1
})

