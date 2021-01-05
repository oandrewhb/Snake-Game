function createMap(){
    const newMap = {}
    newMap.width = 17
    newMap.height = 15
    newMap.map = document.querySelector('#map')
    newMap.mapCells = []
    newMap.renderMap = function(){
        //render map
        for(let line = 0; line < this.height; line++){
            const current_line = document.createElement('tr')
            for(let column = 0; column < this.width; column++){
                current_column = document.createElement('td')
                current_cell = document.createElement('div')
                current_cell.setAttribute('class', 'cell')
                current_cell.setAttribute('id', `cell-${line}-${column}`)
                current_column.appendChild(current_cell)
                current_line.appendChild(current_column)
            }
            this.map.appendChild(current_line)
        }

        //feed mapCells
        for(let line = 0; line < this.height; line++){
            const current_cells_line = []
            for(let column = 0; column < this.width; column++){
                current_cells_line.push(document.querySelector(`#cell-${line}-${column}`))
            }
            this.mapCells.push(current_cells_line)
        }
    }

    return newMap
}