const recordingContainer = document.querySelector("#js-videoRecorder");
const startBtn = document.querySelector("#js-recordStart");
const stopBtn = document.querySelector("#js-recordStop");
const preview = document.querySelector("#js-videoRecorder video");

const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 },
    });
    preview.srcObject = stream;
    preview.muted = true;
    preview.play();
    startBtn.classList.toggle("recordBtn-showing");
    stopBtn.classList.toggle("recordBtn-showing");
  } catch (error) {
    startBtn.innerHTML = "record unauthorised";
  } finally {
    startBtn.removeEventListener("click", getVideo);
  }
};

const init = () => {
  startBtn.addEventListener("click", getVideo);
};

if (recordingContainer) {
  init();
}
