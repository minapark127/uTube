const videoPlayer = document.querySelector("#js-videoPlayer");
const video = document.querySelector("#js-video");
const playBtn = document.querySelector("#js-playBtn");
const volumeBtn = document.querySelector("#js-volumeBtn");
const fullScreenBtn = document.querySelector("#js-fullScreenBtn");

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

const init = () => {
  playBtn.addEventListener("click", playClickHandler);
  volumeBtn.addEventListener("click", volumeClickHandler);
  fullScreenBtn.addEventListener("click", fullScreenClickHandler);
};

if (videoPlayer) {
  init();
}
