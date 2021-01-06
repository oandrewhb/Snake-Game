const map = createMap(); map.renderMap()

const fruit = createFruit()

const snake = createSnake(3)

document.addEventListener('keydown', (e) => {
    if (e.code === "ArrowUp" || e.code === "KeyW"){snake.moveSnake("up"); pauseOff()}
    else if (e.code === "ArrowDown" || e.code === "KeyS"){snake.moveSnake("down"); pauseOff()}
    else if(e.code === "ArrowRight" || e.code === "KeyD"){snake.moveSnake("right"); pauseOff()}
    else if(e.code === "ArrowLeft" || e.code === "KeyA"){snake.moveSnake("left"); pauseOff()}
    else if(e.code === "KeyP"){pauseButton()}

    controler.restart()
    });

let pause = true
function pauseButton(){
    if(pause == false){
        pauseOn()
    } else {
        pauseOff()
    }
}
function pauseOn(){
    pause = true
    document.querySelector('#pause-text').innerHTML = "Press any button to start"
}
function pauseOff(){
    pause = false
    document.querySelector('#pause-text').innerHTML = "Press <b>P</b> to pause"
}

const controler = {
    count: 0,
    max: 25,
    restart(){
        this.count = 0
    },
    add(){
        this.count++
    }
}
function play(){
    if(!pause){
        controler.add()
        if(controler.count >= controler.max){
            snake.moveSnake()
            controler.restart()
        }
    }
    setTimeout(play, 1)
}
play()

function updateScore(){
    const score = document.querySelector('#score-counter')
    let count_score = parseInt(score.textContent)

    count_score++
    score.textContent = count_score.toString()
}
function resetScoreCounter(){
    const score = document.querySelector('#score-counter')
    const highScore = document.querySelector('#highscore-counter')

    let count_score = parseInt(score.textContent)
    let count_highScore = parseInt(highScore.textContent)
    if(count_highScore < count_score){
        highScore.textContent = count_score.toString()
    }

    document.querySelector('#score-counter').textContent = "0"
}