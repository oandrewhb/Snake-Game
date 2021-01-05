function createFruit(){
    newFruit = {}
    newFruit.y = 7
    newFruit.x = 12
    newFruit.changeLocation = function(){
        let newY = randomInt(0, map.height-1)
        let newX = randomInt(0, map.width-1)

        while($(map.mapCells[newY][newX]).hasClass("snake")){
            newY = randomInt(0, map.height-1)
            newX = randomInt(0, map.width-1)
        }

        map.mapCells[this.y][this.x].classList.remove('fruit')
        this.y = newY
        this.x = newX
        map.mapCells[this.y][this.x].classList.add('fruit')
    }
    newFruit.restart = function(){
        map.mapCells[this.y][this.x].classList.remove('fruit')
        this.y = 7
        this.x = 12
        map.mapCells[this.y][this.x].classList.add('fruit')
    }

    map.mapCells[newFruit.y][newFruit.x].classList.add('fruit')

    return newFruit
}