function snakePart(y, x){
    this.y = y
    this.x = x
}

function createSnake(initialSnakeSize=1){
    const newSnake = {}
    newSnake.direction = "right"
    newSnake.headLocation = {y:7, x:0}
    newSnake.array = []
    newSnake.addSnakePart = function(repetsion=1){
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

            if($(map.mapCells[newHeadLocation.y][newHeadLocation.x]).hasClass("snake")){
                return false
            } else {
                this.headLocation.y = newHeadLocation.y
                this.headLocation.x = newHeadLocation.x

                this.array.push(new snakePart(this.headLocation.y, this.headLocation.x))
                map.mapCells[this.headLocation.y][this.headLocation.x].classList.add('snake')
            }
        }        
        return true
    }
    newSnake.removeSnakePart = function(){
        const currentSnakePart = this.array[0]
        map.mapCells[currentSnakePart.y][currentSnakePart.x].classList.remove('snake')
        this.array.splice(0, 1)
    }
    newSnake.changeDirection = function(param){
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
    newSnake.moveSnake = function(param){
        if(this.changeDirection(param)){
            if(this.addSnakePart()){
                if($(map.mapCells[this.headLocation.y][this.headLocation.x]).hasClass("fruit")){
                    fruit.changeLocation()
                    updateScore()
                } else {
                    this.removeSnakePart()
                }
            } else {
                resetScoreCounter()
                alert("GAME OVER")
                snake.restart()
                fruit.restart()
            }
        }
    }
    newSnake.restart = function(){
        this.direction = "right"
        while(this.array.length > 0){
            this.removeSnakePart()
        }
        this.headLocation = {y:7, x:0}
        this.addSnakePart(3)
    }

    newSnake.addSnakePart(initialSnakeSize)
    return newSnake
}