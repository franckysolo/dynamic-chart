/**
 * @author franckysolo - 22/12/2016
 *
 * @description Dynamic Graph example
 * Testing webpack es6 jquery bootstrap and canvas together
 * Graph template example for Arduino project sensor
 */
import './assets/less/style.less'
import 'jquery'
import 'bootstrap'
// Initialize canvas
var canvas = $('#graph')
var ctx = canvas.get(0).getContext('2d')
// Datas array
var stack = []
var stackTime = []
/**
 * Clear canvas
 *
 * @param  {Canvas context} ctx
 * @return {Void}
 */
function clear (ctx) {
  ctx.clearRect(0, 0, 800, 600)
}
/**
 * Drawing graphic space
 *
 * @param  {Canvas context} ctx
 * @param  {Date} date
 * @return {Void}
 */
function drawSpace (ctx, date) {
  var unitX = 700 / 10
  // drawin graph space
  ctx.fillStyle = '#212121'
  ctx.fillRect(0, 0, 800, 600)
  // Drawing labels
  ctx.fillStyle = '#ccc'
  ctx.font = 'normal 12pt Calibri'
  ctx.textAlign = 'center'
  ctx.fillText(`Relevé de température du ${date.toLocaleDateString()} - capteur TMP 36`, 400, 35)
  ctx.font = 'normal 9pt Calibri'
  ctx.textAlign = 'left'
  ctx.fillText('Température', 10, 35)
  ctx.textAlign = 'right'
  ctx.font = 'normal 8pt Calibri'
  ctx.fillText('Heure', 770, 550)
  // xGrids
  ctx.fillStyle = '#333'
  for (var i = 510; i >= 50;  i -= 50) {
    ctx.fillRect(50, i, 700, 1)
  }
  // yGrids
  for (var i = 50; i <= 700;  i += unitX) {
    ctx.fillRect(i, 50, 1, 510)
  }
  ctx.font = 'normal 9pt Calibri';
  ctx.textAlign = 'left'
  // Axis x
  ctx.fillRect(50, 560, 700, 1)
  // Axis y
  ctx.fillRect(50, 50, 1, 510)
  // yTicks
  for (var i = 560, j = 0; i >= 50;  i -= 50, j++) {
    ctx.fillStyle = '#333'
    ctx.fillRect(50, i, -5, 1)
    ctx.fillStyle = '#ccc'
    ctx.fillText(j * 5 + '°', 10, i + 4.5)
  }
  // xTicks
  ctx.fillStyle = '#333'
  for (var i = 50; i <= 700;  i += unitX) {
    ctx.fillRect(i, 560, 1, 10)
  }
}
/**
 * Draw a Dynamic Graphic
 *
 * @param  {Canvas context} ctx
 * @return {Void}
 */
function drawDynamicGraph (ctx) {
  clear(ctx)
  var date = new Date()
  drawSpace(ctx, date)
  ctx.font = 'normal 8pt Calibri'
  ctx.textAlign = 'left'
  for (var i = 0; i < stack.length; i++) {
    if (stack[i + 1]) {
      let current = stack[i]
      let next = stack[i + 1]
      let cx = 0
      let nx = 0
      let index = i + 1
      if (i > 0) {
        cx = (70 * index) - 20
        nx = cx + 70
      } else {
        cx = 50
        nx = cx + 70
      }
      ctx.fillStyle = current < 20 ? '#F00' : '#FFF'
      let cy = 560 - (current * 10)
      let ny = 560 - (next * 10)
      ctx.strokeStyle = '#0Fc'
      ctx.beginPath()
      ctx.lineTo(cx, cy)
      ctx.lineTo(nx, ny)
      ctx.lineJoin = 'miter'
      ctx.stroke()
      ctx.fillText(current, cx - 15, cy - 40)
      if (stackTime[i + 1]) {
        ctx.fillText(stackTime[i], cx + 10, 575)
      }
    }
  }
}
/**
 * Generate random data to simulate sensor data receptions
 * and store in global array
 *
 * @param  {Integer} min the min value
 * @param  {Integer} max the max value
 * @return {Void}
 */
function generateRandomDatas(min, max) {
  let date = new Date()
  let number = (Math.random() * (max - min) + min).toFixed(2)
  let currentTime = date.toLocaleTimeString()
  // not full stack we push data
  if (stack.length < 10) {
    stack.push(number)
    stackTime.push(currentTime)
  } else {
    // On retire le premier element de la liste
    stack.shift()
    stackTime.shift()
    // On ajoute le dernier element
    stack.push(number)
    stackTime.push(currentTime)
  }
}
// for debug
function displayData () {
  $('#display').html(stack.join(','))
}
// The main loop
function dynGraph () {
  generateRandomDatas(18.01, 35.99)
  drawDynamicGraph(ctx)
  displayData()
}

function run() {
  // Run it dynGraph every seconds
  var timer = setInterval(dynGraph, 1000)
  // @TODO events buttons
}
run()
