const stopChimeButton = document.getElementById('stop-chime') as HTMLButtonElement
const timeIntervalSelect = document.getElementById('time-interval-select') as HTMLSelectElement
const audioPlayer = document.getElementById('audio-player') as HTMLAudioElement
const currentTimeSpan = document.querySelector('.current-time') as HTMLSpanElement

let chimeIntervalId: number | undefined

const playChime = () => {
  if (!audioPlayer.paused) {
    audioPlayer.currentTime = 0
    audioPlayer.pause()
  }

  audioPlayer.play()
}

const scheduleChime = () => {
  const interval = parseInt(timeIntervalSelect.value)
  const currentTimeInMs = Date.now()
  const difference = currentTimeInMs % interval
  const nextSchedule = interval - difference

  chimeIntervalId = setTimeout(() => {
    playChime()
    scheduleChime()
  }, nextSchedule)
}

const handleSetChime = () => {
  clearTimeout(chimeIntervalId)
  handleStopChime()
  scheduleChime()
}

const handleStopChime = () => {
  audioPlayer.currentTime = 0
  audioPlayer.pause()
}

const displayCurrentTime = () => {
  currentTimeSpan.innerText = new Date().toLocaleTimeString('en-GB')

  requestAnimationFrame(displayCurrentTime)
}

timeIntervalSelect.addEventListener('change', handleSetChime)
stopChimeButton.addEventListener('click', handleStopChime)

displayCurrentTime()
handleSetChime()
