// button controls
const start = document.querySelector('button.start')
const stop = document.querySelector('button.stop')
const lap = document.querySelector('button.lap')
const reset = document.querySelector('button.reset')

// DOM elements that I need to update
const lapList = document.querySelector('#lapList')
const stopwatchTime = document.querySelector('#stopwatchTime')

// constants that shouldn't ever change
const intervalRate = 10 // update the stopwatch every 10 milliseconds

// array for laps. if constant reset won't work
laps = []

// values that will change pretty often
let intervalId = null
let rawTime = 0

// turns the time into a human readable format
function formatTime (raw) {
  let seconds = Math.floor(raw / 1000)
  let fractionalSeconds = (raw % 1000) / 1000
  let minutes = Math.floor(seconds / 60)
  seconds = seconds - (60 * minutes) + fractionalSeconds

  return `${zeroPad(minutes)}:${zeroPad(seconds.toFixed(2))}`
}

// start the stopwatch by creating a new interval
// we'll store the interval id so we can manipulate the interval later
function stopwatchStart (event) {
  event.preventDefault()
  console.log('started!')

  // every 10 milliseconds, update the stopwatch
  intervalId = setInterval(stopwatchUpdate, intervalRate)
}

// adds the interval to the stopwatch time since the last "tick"
// then update the DOM with the new stopwatch time
function stopwatchUpdate () {
  rawTime += intervalRate
  stopwatchTime.innerHTML = formatTime(rawTime)
}

// stops the stopwatch by clearing the interval
function stopwatchStop (event) {
  event.preventDefault()
  console.log('stopped!')

  clearInterval(intervalId)
}

// logs the lap in the lap array
function stopwatchLap (event) {
  event.preventDefault()
  laps.push(stopwatchTime.innerHTML)
  console.log(laps)
  console.log('Recorded!')
  clearInterval(intervalId)
  rawTime = 0;
  stopwatchTime.innerHTML = formatTime(rawTime)
  var lapsYah = "";
  for (var i = 0, lap; lap = laps[i]; i++) {
    lapsYah += "<li>" + lap + "</li>";
   }
  document.getElementById("lapList").innerHTML = lapsYah;
}

// clears the stopwatch and the lap array
function stopwatchReset (event) {
  event.preventDefault()
  laps = [];
  console.log('Restart!')
  rawTime = 0;
  stopwatchTime.innerHTML = formatTime(rawTime)
  clearInterval(intervalId)
  var lapsYah = "";
  for (var i = 0, lap; lap = laps[i]; i++) {
    lapsYah += "<li>" + lap + "</li>";
   }
  document.getElementById("lapList").innerHTML = lapsYah;
}

// adds a leading zero because humans like them
function zeroPad (value) {
  let pad = value < 10 ? '0' : ''
  return `${pad}${value}`
}

document.addEventListener("DOMContentLoaded", function () {
  console.log('ready!')


  start.addEventListener("click", stopwatchStart)
  stop.addEventListener("click", stopwatchStop)
  lap.addEventListener("click", stopwatchLap)
  reset.addEventListener("click", stopwatchReset)
})
