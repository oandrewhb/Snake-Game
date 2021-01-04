const map = {
    width: 20,
    height: 20,
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
    this.y = 0
    this.x = 0
    this.changeLocation = function(){
        let newY = randomInt(0, map.width-1)
        let newX = randomInt(0, map.height-1)

        while($(mapCells[newY][newX]).hasClass("snake")){
            newX = randomInt(0, map.height-1)
            newY = randomInt(0, map.width-1)
        }

        mapCells[this.y][this.x].classList.remove('fruit')
        this.y = newY
        this.x = newX
        mapCells[this.y][this.x].classList.add('fruit')
    }

    this.changeLocation()
    mapCells[this.y][this.x].classList.add('fruit')
}
const fruit = new Fruit()


function snakePart(y, x){
    this.y = y
    this.x = x
}

const snake = {
    direction: "right",
    headLocation: {y:10, x:0},
    array: [],
    addSnakePart(repetsion=1){
        for(let i = 0; i < repetsion; i++){
            if(this.direction == "up"){
                this.headLocation.y--
            } else if(this.direction == "right"){
                this.headLocation.x++
            } else if(this.direction == "down"){
                this.headLocation.y++
            } else if(this.direction == "left"){
                this.headLocation.x--
            }
            this.array.push(new snakePart(this.headLocation.y, this.headLocation.x))
            mapCells[this.headLocation.y][this.headLocation.x].classList.add('snake')
        }
    },
    removeSnakePart(){
        const currentSnakePart = this.array[0]
        mapCells[currentSnakePart.y][currentSnakePart.x].classList.remove('snake')
        this.array.splice(0, 1)
    },
    moveSnake(param){
        this.changeDirection(param)
        this.addSnakePart()
        if(this.headLocation.x == fruit.x && this.headLocation.y == fruit.y){
            fruit.changeLocation()
        } else {
            this.removeSnakePart()
        }
    },
    changeDirection(param){
        if(param == "up"){
            this.direction = "up"
        } else if(param == "right"){
            this.direction = "right"
        } else if(param == "down"){
            this.direction = "down"
        } else if(param == "left"){
            this.direction = "left"
        }
    }
}
snake.addSnakePart(5)

document.addEventListener('keyup', (e) => {
    if (e.code === "ArrowUp"){snake.moveSnake("up")}
    else if (e.code === "ArrowDown"){snake.moveSnake("down")}
    else if(e.code === "ArrowRight"){snake.moveSnake("right")}
    else if(e.code === "ArrowLeft"){snake.moveSnake("left")}
    });