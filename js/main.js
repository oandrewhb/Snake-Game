const map = {
    width: 17,
    height: 15,
    map: document.querySelector('#map'),
}

const mapCells = []
function renderMap(){
    //render map
    for(let line = 0; line < map.height; line++){
        const current_line = document.createElement('tr')
        for(let column = 0; column < map.width; column++){
            current_column = document.createElement('td')
            current_cell = document.createElement('div')
            current_cell.setAttribute('class', 'cell')
            current_cell.setAttribute('id', `cell-${line}-${column}`)
            current_column.appendChild(current_cell)
            current_line.appendChild(current_column)
        }
        map.map.appendChild(current_line)
    }

    //feed mapCells
    for(let line = 0; line < map.height; line++){
        const current_cells_line = []
        for(let column = 0; column < map.width; column++){
            current_cells_line.push(document.querySelector(`#cell-${line}-${column}`))
        }
        mapCells.push(current_cells_line)
    }
}
renderMap()

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