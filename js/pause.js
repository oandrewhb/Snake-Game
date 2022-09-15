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
    document.querySelector('#mobileBtnPause').innerHTML = '<i class="bi bi-play-circle"></i>'
}
function pauseOff(){
    pause = false
    document.querySelector('#pause-text').innerHTML = "Press <b>SPACE</b> to pause"
    document.querySelector('#mobileBtnPause').innerHTML = '<i class="bi bi-pause-circle">'
}