//Estas dos líneas de código están obteniendo dos elementos del DOM (Document Object Model) con los identificadores "canvas" y "increase"/"decrease".
const canvas = document.getElementById('canvas');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeEL = document.getElementById('size');
const colorEl = document.getElementById('color');
const clearEl = document.getElementById('clear');
//Se está obteniendo el contexto 2D del canvas, que es un objeto que permite dibujar en el canvas.
const ctx = canvas.getContext('2d');
//Se declara variable llamada "size", que almacena el tamaño inicial del pincel (10px).
let size = 10
// Se está declarando una variable llamada "isPressed", que indica si el botón izquierdo del ratón está siendo presionado o no.
let isPressed = false
//El color se inicializa por defecto a negro
colorEl.value = 'black'
let color = colorEl.value
let x
let y
//Aquí se está agregando un event listener al canvas para detectar cuando el botón izquierdo del ratón es presionado. La función anónima que se pasa como argumento toma un evento "e", y establece la variable "isPressed" en verdadero y guarda las coordenadas del mouse en "x" e "y".
canvas.addEventListener('mousedown', (e) => {
    isPressed = true
    x = e.offsetX
    y = e.offsetY
})
//Aquí se está agregando un event listener al documento para detectar cuando el botón izquierdo del mouse es soltado. La función anónima que se pasa como argumento establece la variable "isPressed" en falso y resetea las coordenadas "x" e "y" a "undefined".
document.addEventListener('mouseup', (e) => {
    isPressed = false
    x = undefined
    y = undefined
})
//La condición dentro de la función comprueba si la variable "isPressed" es verdadera. Si es así, significa que el ratón está presionado y se está dibujando en el canvas. Entonces, se obtienen las coordenadas actuales del ratón (x2, y2) utilizando las propiedades "offsetX" y "offsetY" del objeto de evento.
canvas.addEventListener('mousemove', (e) => {
    if (isPressed) {
        const x2 = e.offsetX
        const y2 = e.offsetY
        drawCircle(x2, y2)
        drawLine(x, y, x2, y2)
        x = x2
        y = y2
    }
})
//Se llama a la función "drawCircle" con las nuevas coordenadas para dibujar un círculo en el canvas en ese punto. También se llama a la función "drawLine" con las coordenadas antiguas (x, y) y las nuevas (x2, y2) para dibujar una línea que conecte ambos puntos.
function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
}
//La función "drawLine" dibuja una línea en el canvas, utilizando los parámetros "x1", "y1", "x2", y "y2" como sus extremos. Se utiliza el método "moveTo" y "lineTo" de la API de canvas para crear un camino y se especifica el estilo de la línea con "strokeStyle" y su ancho con "lineWidth".
function drawLine(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = color
    ctx.lineWidth = size * 2
    ctx.stroke()
}
//La función "updateSizeOnScreen" actualiza la representación en pantalla del tamaño actual del pincel.
function updateSizeOnScreen() {
    sizeEL.innerText = size
}
//El event listener en el botón "increaseBtn" aumenta el tamaño del pincel en 5 unidades, hasta un máximo de 50 unidades. Si el tamaño es mayor que 50, se establece en 50. La función "updateSizeOnScreen" es llamada para actualizar la representación en pantalla.
increaseBtn.addEventListener('click', () => {
    size += 5
    if (size > 50) {
        size = 50
    }
    updateSizeOnScreen()
})
//El event listener en el botón "decreaseBtn" disminuye el tamaño del pincel en 5 unidades, hasta un mínimo de 5 unidades. Si el tamaño es menor que 5, se establece en 5. La función "updateSizeOnScreen" es llamada para actualizar la representación en pantalla.
decreaseBtn.addEventListener('click', () => {
    size -= 5
    if (size < 5) {
        size = 5
    }
    updateSizeOnScreen()
})
//El event listener en el elemento "colorEl" establece la variable global "color" como el color seleccionado por el usuario.
colorEl.addEventListener('change', (e) => color = e.target.value)
//El event listener en el elemento "clearEl" borra todo lo dibujado en el canvas, utilizando el método "clearRect" de la API de canvas para borrar un área específica del canvas.git
clearEl.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height))