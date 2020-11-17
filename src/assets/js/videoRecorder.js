const recordingContainer = document.querySelector("#js-videoRecorder");
const startBtn = document.querySelector("#js-recordStart");
const stopBtn = document.querySelector("#js-recordStop");
const preview = document.querySelector("#js-videoRecorder video");

let streamObj;
let videoRecorder;

const handleVideoData = (event) => {
  const { data: videoFile } = event;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "recorded_uTube.webm";
  document.body.appendChild(link);
  link.click();
};

const stopRecording = () => {
  stopBtn.classList.toggle("recordBtn-showing");
  startBtn.classList.toggle("recordBtn-showing");
  preview.srcObject = null;
  streamObj.getTracks().forEach((track) => {
    track.stop();
  });
  stopBtn.removeEventListener("click", stopRecording);
  startBtn.addEventListener("click", getVideo);
};

const startRecording = () => {
  videoRecorder = new MediaRecorder(streamObj);
  videoRecorder.start();
  videoRecorder.addEventListener("dataavailable", handleVideoData);
  stopBtn.addEventListener("click", stopRecording);
};

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
    streamObj = stream;
    startRecording();
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
