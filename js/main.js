const map = createMap()
map.renderMap()

const fruit = createFruit()

const snake = createSnake(3)

document.addEventListener('keydown', (e) => {
    if (e.code === "ArrowUp" || e.code === "KeyW"){snake.moveSnake("up")}
    else if (e.code === "ArrowDown" || e.code === "KeyS"){snake.moveSnake("down")}
    else if(e.code === "ArrowRight" || e.code === "KeyD"){snake.moveSnake("right")}
    else if(e.code === "ArrowLeft" || e.code === "KeyA"){snake.moveSnake("left")}
    else if(e.code === "KeyP"){pauseButton()}

    controler.restart()
    });

let pause = false
function pauseButton(){
    if(pause == false){
        pause = true
    } else {
        pause = false
    }
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