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

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Fruit(){
    this.y = 7
    this.x = 12
    this.changeLocation = function(){
        let newY = randomInt(0, map.height-1)
        let newX = randomInt(0, map.width-1)

        while($(mapCells[newY][newX]).hasClass("snake")){
            newY = randomInt(0, map.height-1)
            newX = randomInt(0, map.width-1)
        }

        mapCells[this.y][this.x].classList.remove('fruit')
        this.y = newY
        this.x = newX
        mapCells[this.y][this.x].classList.add('fruit')
    }

    mapCells[this.y][this.x].classList.add('fruit')
}
const fruit = new Fruit()


function snakePart(y, x){
    this.y = y
    this.x = x
}

const snake = createSnake(3)

document.addEventListener('keyup', (e) => {
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