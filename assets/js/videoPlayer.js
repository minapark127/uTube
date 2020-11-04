const videoPlayer = document.querySelector("#js-videoPlayer");
const video = videoPlayer.querySelector("video");
const playBtn = document.querySelector("#js-playBtn");

const playClickHandler = () => {
  if (video.paused) {
    video.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    video.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
};

const init = () => {
  playBtn.addEventListener("click", playClickHandler);
};

if (videoPlayer) {
  init();
}
