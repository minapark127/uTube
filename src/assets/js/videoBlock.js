const videos = document.querySelectorAll(".js-videoBlock video");

const stopPreviewVideo = (event) => {
  const { target: video } = event;
  video.pause();
  video.currentTime = 0;
};

const previewVideo = (event) => {
  const { target: video } = event;
  video.muted = true;
  video.play();
  window.setTimeout(() => {
    video.pause();
  }, 5000);
  window.setTimeout(() => {
    video.currentTime = 0;
  }, 6500);
};

if (videos) {
  videos.forEach((video) => {
    video.addEventListener("mouseenter", previewVideo);
    video.addEventListener("mouseout", stopPreviewVideo);
  });
}
