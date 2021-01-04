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
        const current_cells_line = []
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
            newX = randomInt(0, map.height-1)
            newY = randomInt(0, map.width-1)
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

const snake = {
    direction: "right",
    headLocation: {y:7, x:0},
    array: [],
    addSnakePart(repetsion=1){
        for(let i = 0; i < repetsion; i++){

            const newHeadLocation = {
                y: this.headLocation.y,
                x: this.headLocation.x
            }   

            if(this.direction == "up"){
                if(this.headLocation.y == 0){
                    newHeadLocation.y = map.height-1
                } else {
                    newHeadLocation.y--
                }
            } else if(this.direction == "right"){
                if(this.headLocation.x == map.width-1){
                    newHeadLocation.x = 0
                } else {
                    newHeadLocation.x++
                }
            } else if(this.direction == "down"){
                if(this.headLocation.y == map.height-1){
                    newHeadLocation.y = 0
                } else {
                    newHeadLocation.y++
                }
            } else if(this.direction == "left"){
                if(this.headLocation.x == 0){
                    newHeadLocation.x = map.width-1
                } else {
                    newHeadLocation.x--
                }
            }

            if($(mapCells[newHeadLocation.y][newHeadLocation.x]).hasClass("snake")){
                return false
            } else {
                this.headLocation.y = newHeadLocation.y
                this.headLocation.x = newHeadLocation.x

                this.array.push(new snakePart(this.headLocation.y, this.headLocation.x))
                mapCells[this.headLocation.y][this.headLocation.x].classList.add('snake')
            }
        }
        return true
    },
    removeSnakePart(){
        const currentSnakePart = this.array[0]
        mapCells[currentSnakePart.y][currentSnakePart.x].classList.remove('snake')
        this.array.splice(0, 1)
    },
    moveSnake(param){
        if(this.changeDirection(param)){
            if(this.addSnakePart()){
                if(this.headLocation.x == fruit.x && this.headLocation.y == fruit.y){
                    fruit.changeLocation()
                } else {
                    this.removeSnakePart()
                }
            } else {
                alert("BATEU")
            }
        }
    },
    changeDirection(param){
        let result = true
        if(param == "up"){
            if(this.direction != "down"){
                this.direction = "up"
            } else {
                result = false
            }
        } else if(param == "right"){
            if(this.direction != "left"){
                this.direction = "right"
            } else {
                result = false
            }
        } else if(param == "down"){
            if(this.direction != "up"){
                this.direction = "down"
            } else {
                result = false
            }
        } else if(param == "left"){
            if(this.direction != "right"){
                this.direction = "left"
            } else {
                result = false
            }
        }
        return result
    }
}
snake.addSnakePart(3)

document.addEventListener('keyup', (e) => {
    if (e.code === "ArrowUp" || e.code === "KeyW"){snake.moveSnake("up")}
    else if (e.code === "ArrowDown" || e.code === "KeyS"){snake.moveSnake("down")}
    else if(e.code === "ArrowRight" || e.code === "KeyD"){snake.moveSnake("right")}
    else if(e.code === "ArrowLeft" || e.code === "KeyA"){snake.moveSnake("left")}
    else if(e.code === "KeyP"){pauseButton()}
    });

let pause = false
function pauseButton(){
    if(pause == false){
        pause = true
    } else {
        pause = false
    }
}

function run(){
    if(!pause){
        snake.moveSnake()
    }
    setTimeout(run, 1000/5)
}
run()