<template>
  <div class="m-2 p-4 border-2 border-pink-100">
    <h2 class="text-3xl">web摄像</h2>
    <button class="ml-0" @click="toggleRecord">
      {{ recoding ? "停止摄像" : "开始摄像" }}
    </button>
    <div class="grid grid-cols-2 gap-2">
      <video class="max-w-full" ref="videoPlayer" autoplay controls></video>
      <ul>
        <li>自动截图</li>
        <canvas id="snapshot"></canvas>
      </ul>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onUnmounted, onMounted, ref } from "vue";

function drawCanvas(canvas, img) {
  canvas.width = getComputedStyle(canvas).width.split("px")[0];
  canvas.height = getComputedStyle(canvas).height.split("px")[0];
  let ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
  let x = (canvas.width - img.width * ratio) / 2;
  let y = (canvas.height - img.height * ratio) / 2;
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  canvas
    .getContext("2d")
    .drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      x,
      y,
      img.width * ratio,
      img.height * ratio
    );
}

function CreateAudioRecord(MediaElement) {
  let stream;
  let recorder;
  let recorded;
  let imageCapturer;

  function imageCaptureService(videoTrack) {
    const capturer = new ImageCapture(videoTrack);
    let intervalId = 0;

    return {
      start() {
        setInterval(() => {
          if (intervalId !== -1) {
            capturer
              .grabFrame()
              .then((imageBitMap) =>
                drawCanvas(document.getElementById("snapshot"), imageBitMap)
              );
          }
        }, 3000);
      },
      destroy() {
        clearInterval(intervalId);
        intervalId = -1;
      },
    };
  }

  async function record() {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    // clear
    MediaElement.src = undefined;

    MediaElement.srcObject = stream;

    recorded = [];
    recorder = new MediaRecorder(stream);

    imageCapturer = imageCaptureService(stream.getVideoTracks()[0]);
    imageCapturer.start();

    recorder.ondataavailable = (event) => recorded.push(event.data);
    recorder.start();
  }

  function stop() {
    recorder.state == "recording" ?? recorder.stop();
    imageCapturer.destroy();

    /**@type {HTMLCanvasElement} */
    const canvas = document.getElementById("snapshot");
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

    stream.getTracks().forEach((track) => track.stop());

    setTimeout(() => {
      MediaElement.srcObject = undefined;
      MediaElement.src = URL.createObjectURL(new Blob(recorded));
      MediaElement.play();
    }, 100);
  }

  return {
    record,
    stop,
    destroy: () => (stream = MediaElement = recorded = null),
  };
}

export default {
  setup() {
    const videoPlayer = ref(null);

    const data = reactive({
      recoding: false,
    });

    let Record;

    onMounted(() => (Record = CreateAudioRecord(videoPlayer.value)));

    onUnmounted(() => Record.destroy());

    // do some magic thing

    return {
      ...toRefs(data),
      videoPlayer,
      toggleRecord: () => {
        if (data.recoding) {
          Record.stop();
        } else {
          Record.record();
        }

        data.recoding = !data.recoding;
      },
    };
  },
};
</script>

<style></style>
