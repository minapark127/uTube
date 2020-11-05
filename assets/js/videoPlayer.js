const videoPlayer = document.querySelector("#js-videoPlayer");
const controls = document.querySelector("#js-videoPlayerControls");
const video = document.querySelector("#js-videoPlayer video");
const playBtn = document.querySelector("#js-playBtn");
const volumeBtn = document.querySelector("#js-volumeBtn");
const volumeBar = document.querySelector("#js-volumeBar");
const fullScreenBtn = document.querySelector("#js-fullScreenBtn");
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
    volumeBar.value = video.volume;
  } else {
    video.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    volumeBar.value = 0;
  }
};

const showVolumeBar = () => {
  volumeBar.classList.add("volumeBarShow");
  volumeBar.classList.remove("volumeBarHidden");
};

const hideVolumeBar = () => {
  volumeBar.classList.remove("volumeBarShow");
  volumeBar.classList.add("volumeBarHidden");
};

const VolumeBarChangeHandler = (event) => {
  const {
    target: { value },
  } = event;
  video.volume = value;
  if (value >= 0.7) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (value >= 0.4) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else if (value >= 0.05) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
  } else if (value < 0.05) {
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

const handleVideoEnded = () => {
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
  window.setTimeout(() => {
    video.currentTime = 0;
  }, 1000);
};

const init = () => {
  video.volume = 1;
  playBtn.addEventListener("click", playClickHandler);
  volumeBtn.addEventListener("click", volumeClickHandler);
  fullScreenBtn.addEventListener("click", fullScreenClickHandler);
  video.addEventListener("loadedmetadata", setVideoTime);
  video.addEventListener("timeupdate", setCurrentTime);
  video.addEventListener("ended", handleVideoEnded);
  volumeBar.addEventListener("input", VolumeBarChangeHandler);
  volumeBtn.addEventListener("mouseenter", showVolumeBar);
  controls.addEventListener("mouseleave", hideVolumeBar);
};

if (videoPlayer) {
  init();
}
