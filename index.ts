const setChimeButton = document.getElementById('set-chime') as HTMLButtonElement
const stopChimeButton = document.getElementById('stop-chime') as HTMLButtonElement
const audioPlayer = document.getElementById('audio-player') as HTMLAudioElement

let chimeIntervalId: number | undefined

const computeInterval = () => {
  const timeElements = document.getElementsByClassName('time') as HTMLCollectionOf<HTMLInputElement>

  let hours = 0
  let minutes = 0
  let seconds = 0

  for (const element of timeElements) {
    switch (element.dataset['type']) {
      case 'hours':
        hours = parseInt(element.value)
        break
      case 'minutes':
        minutes = parseInt(element.value)
        break
      case 'seconds':
        seconds = parseInt(element.value)
        break
    }
  }

  return hours * 1000 * 60 * 60 + minutes * 1000 * 60 + seconds * 1000
}

const playChime = () => {
  audioPlayer.paused && audioPlayer.play()
}

const handleSetChime = () => {
  const interval = computeInterval()

  console.log('setting', interval)

  interval >= 1000 && (chimeIntervalId = setInterval(playChime, interval))
}

const handleStopChime = () => {
  clearInterval(chimeIntervalId)
  audioPlayer.currentTime = 0
  audioPlayer.pause()
}

setChimeButton.addEventListener('click', handleSetChime)
stopChimeButton.addEventListener('click', handleStopChime)
