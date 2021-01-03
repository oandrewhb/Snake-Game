function renderMap(height, width){
    const map = document.querySelector('#map')
    for(let line = 0; line < height; line++){
        const current_line = document.createElement('tr')
        for(let column = 0; column < width; column++){
            current_column = document.createElement('td')
            current_cell = document.createElement('div')
            current_cell.setAttribute('class', 'cell')
            current_cell.setAttribute('id', `cell-${line}-${column}`)
            current_column.appendChild(current_cell)
            current_line.appendChild(current_column)
        }
        map.appendChild(current_line)
    }
}
renderMap(20,20)