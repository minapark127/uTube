const videoPlayer = document.querySelector("#js-videoPlayer");
const video = document.querySelector("#js-videoPlayer video");
const playBtn = document.querySelector("#js-playBtn");
const volumeBtn = document.querySelector("#js-volumeBtn");
const fullScreenBtn = document.querySelector("#js-fullScreenBtn");
const timebar = document.querySelector("#js-timeBar");
const currentTimebar = document.querySelector("#js-timeBar-current");
const totalTimebar = document.querySelector("#js-timeBar-total");

const playClickHandler = () => {
  if (video.paused) {
    video.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    video.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
};

const volumeClickHandler = () => {
  if (video.muted) {
    video.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    video.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
};

const fullScreenClickHandler = () => {
  if (document.fullscreenElement) {
    fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    document.exitFullscreen();
  } else {
    fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
    videoPlayer.requestFullscreen();
  }
};

const formatTime = (seconds) => {
  const secondsNumber = parseInt(seconds, 10);
  const hours = Math.floor(secondsNumber / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((secondsNumber - hours * 3600) / 60)
    .toString()
    .padStart(2, "0");
  const leftSeconds = (secondsNumber - hours * 3600 - minutes * 60)
    .toString()
    .padStart(2, "0");

  if (hours === "00") {
    return `${minutes}:${leftSeconds}`;
  }
  return `${hours}:${minutes}:${leftSeconds}`;
};

const setVideoTime = () => {
  totalTimebar.innerHTML = formatTime(video.duration);
};

const setCurrentTime = () => {
  currentTimebar.innerHTML = formatTime(video.currentTime);
};

const init = () => {
  playBtn.addEventListener("click", playClickHandler);
  volumeBtn.addEventListener("click", volumeClickHandler);
  fullScreenBtn.addEventListener("click", fullScreenClickHandler);
  video.addEventListener("loadedmetadata", setVideoTime);
  video.addEventListener("timeupdate", setCurrentTime);
};

if (videoPlayer) {
  init();
}
