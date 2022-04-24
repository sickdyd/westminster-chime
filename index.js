"use strict";
const stopChimeButton = document.getElementById('stop-chime');
const timeIntervalSelect = document.getElementById('time-interval-select');
const audioPlayer = document.getElementById('audio-player');
let chimeIntervalId;
const playChime = () => {
    if (!audioPlayer.paused) {
        audioPlayer.currentTime = 0;
        audioPlayer.pause();
    }
    audioPlayer.play();
};
const scheduleChime = () => {
    const interval = parseInt(timeIntervalSelect.value);
    const currentTimeInMs = Date.now();
    const difference = currentTimeInMs % interval;
    const nextSchedule = interval - difference;
    chimeIntervalId = setTimeout(() => {
        playChime();
        scheduleChime();
    }, nextSchedule);
};
const handleSetChime = () => {
    handleStopChime();
    scheduleChime();
};
const handleStopChime = () => {
    clearTimeout(chimeIntervalId);
    audioPlayer.currentTime = 0;
    audioPlayer.pause();
};
const displayCurrentTime = () => {
    var _a;
    const spanElements = (_a = document
        .querySelector('.current-time')) === null || _a === void 0 ? void 0 : _a.getElementsByTagName('span');
    const hours = new Date().getHours().toString();
    const minutes = new Date().getMinutes().toString();
    const seconds = new Date().getSeconds().toString();
    spanElements[0].innerText = hours.length === 1 ? `0${hours}` : hours;
    spanElements[1].innerText = minutes.length === 1 ? `0${minutes}` : minutes;
    spanElements[2].innerText = seconds.length === 1 ? `0${seconds}` : seconds;
};
timeIntervalSelect.addEventListener('change', handleSetChime);
stopChimeButton.addEventListener('click', handleStopChime);
setInterval(displayCurrentTime, 100);
handleSetChime();
