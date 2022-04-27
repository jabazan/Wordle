const tileDisplay = document.querySelector('.tile-container')
const teclado = document.querySelector('.key-container')
const messageDisplay = document.querySelector('.message-container')

const wordle = 'GERVA'

const teclas = [ 'Q',
                'W',
                'E',    
                'R',
                'T',
                'Y',
                'U',
                'I',
                'O',
                'P',
                'A',
                'S',
                'D',
                'F',
                'G',
                'H',
                'J',
                'K',
                'L',
                'Ñ',
                'Bck',
                'Z',
                'X',
                'C',
                'V',
                'B',
                'N',
                'M',
                'Enter ↲'
]  

const intentos = [
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','','']
]

let filaActual = 0
let posicionActual = 0
let isGameOver = false

intentos.forEach((intento,indexElementoFila) =>{
    /* Genero un div por cada fila del array*/
    const elementoFila = document.createElement('div')
    elementoFila.setAttribute('id','intento-'+indexElementoFila)
    intento.forEach((posicion,indexPosicion)=> {
        const elementoPosicion = document.createElement('div')
        elementoPosicion.setAttribute('id','intento-' + indexElementoFila + '-posicion-' +indexPosicion) 
        elementoPosicion.classList.add('posicion')
        elementoFila.append(elementoPosicion)
    });
    tileDisplay.append(elementoFila);
})


teclas.forEach((tecla) => { 
    const buttonElement = document.createElement('button')
    buttonElement.textContent = tecla
    buttonElement.setAttribute('id', tecla)
    buttonElement.addEventListener('click', () => handleClick(tecla))
    teclado.append(buttonElement)
})

const handleClick = (letra) => {
    console.log('clicked', letra)
    if(letra === 'Bck'){
        borrarLetra()
        return
    }
    if(letra === 'Enter ↲'){
        verificarInteto()
        return
    }
    agregarLetra(letra)
}

const agregarLetra = (letra) => {
    if(posicionActual < 5 && filaActual < 6){
    const posicion = document.getElementById('intento-'+ filaActual + '-posicion-'+ posicionActual)
    posicion.textContent = letra
    intentos[filaActual][posicionActual] = letra
    posicion.setAttribute('data', letra)
    posicionActual++
    console.log('intentos',intentos)
    }
}

const borrarLetra = () => {
    if (posicionActual> 0){
    posicionActual--
    const posicion = document.getElementById('intento-'+filaActual+'-posicion-'+posicionActual)
    posicion.textContent = ''
    intentos[filaActual][posicionActual] = ''
    posicion.setAttribute('data', '')
}

const verificarInteto = () => {
    const intento = intentos[filaActual].join('')
    if (posicionActual > 4){
        flipToColor()
        console.log('Ud dijo '+intento +'  y wordle es '+ wordle)
        if (intento == wordle){
            mostrarMensaje("Felicitaciones");
            isGameOver =true
            return
        }else {
            if(filaActual >= 5){
                isGameOver = false
                mostrarMensaje("Game Over :(")
                return
            }
            if (filaActual < 5){
                filaActual++
                posicionActual = 0
            }
        }
    
    }
}

function mostrarMensaje(mensaje) {
    const elementoMensaje = document.createElement('p')
    elementoMensaje.textContent = mensaje
    messageDisplay.append(elementoMensaje)
    setTimeout(() => messageDisplay.removeChild(elementoMensaje),2500) //para hacer desaparacer el mensaje en 2,5 seg
}

const coloreartecla= (teclaColorear, color) =>{
    teclaColorear = document.getElementById(teclaColorear);
    teclaColorear.classList.add(color);
}

const flipToColor = () => {
    const posiciones_fila = document.getElementById('intento-'+filaActual).childNodes

    posiciones_fila.forEach((posicion, index) =>{
        const dataLetter = posicion.getAttribute('data');
        setTimeout(()=> {
            posicion.classList.add('flipPosicion')
            if (dataLetter == wordle[index]){
                posicion.classList.add('verde-overlay')
                coloreartecla(dataLetter,'verde-overlay')
            }else if(wordle.includes(dataLetter)) {
                posicion.classList.add('amarillo-overlay')
                coloreartecla(dataLetter,'amarillo-overlay')
            }else{
                posicion.classList.add('gris-overlay');
                coloreartecla(dataLetter,'gris-overlay')
            }
        },300*index)
    })
}