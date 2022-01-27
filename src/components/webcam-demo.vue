<template>
  <div class="m-2 p-4 border-2 border-pink-100">
    <h2 class="text-3xl">web摄像</h2>
    <button class="ml-0" @click="toggleRecord">
      {{ recoding ? "停止摄像" : "开始摄像" }}
    </button>
    <div class="grid grid-cols-3 gap-2">
      <video class="max-w-full" ref="videoPlayer" autoplay controls></video>
      <ul>
        <li>自动截图</li>
        <canvas id="snapshot"></canvas>
      </ul>
      <div>
        <h2>相似度: {{ scoreRef }}</h2>
      </div>
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

function CreateAudioRecord(MediaElement, scoreRef) {
  let stream;
  let recorder;
  let recorded;
  let imageCapturer;

  function imageCaptureService(videoTrack) {
    const capturer = new ImageCapture(videoTrack);
    let intervalId = 0;

    const compareService = {
      imageQueue: [],
      push(dataUrl) {
        this.imageQueue.unshift(dataUrl);
        if (this.imageQueue.length > 2) {
          this.imageQueue.pop();
        }
      },
      async compare() {
        // we only compare the latest two images
        if (this.imageQueue.length !== 2) {
          return;
        }

        const response = await fetch("http://192.168.101.203:8010/facediff", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            params: this.imageQueue.map((base64Image) => ({
              image: base64Image.substring(22), // remove "data:image/png;base64," at beginning
              image_type: "BASE64",
              face_type: "LIVE",
            })),
          }),
        });

        return (await response.json()).score;
      },
    };

    function start() {
      setTimeout(async () => {
        if (intervalId !== -1) {
          /**@type {HTMLCanvasElement} */
          const canvas = document.getElementById("snapshot");
          // draw on canvas
          const imageBitMap = await capturer.grabFrame();
          drawCanvas(canvas, imageBitMap);
          // generate dataUrl
          compareService.push(canvas.toDataURL("image/png", 1));
          // Using API to get difference
          const score = await compareService.compare();

          if (score) {
            scoreRef.value = score;
          }
          // loop
          start();
        }
      }, 3000);
    }

    function destroy() {
      clearTimeout(intervalId);
      intervalId = -1;
    }

    return {
      start,
      destroy,
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
    const scoreRef = ref(0);

    const data = reactive({
      recoding: false,
    });

    let Record;

    onMounted(() => (Record = CreateAudioRecord(videoPlayer.value, scoreRef)));

    onUnmounted(() => Record.destroy());

    // do some magic thing

    return {
      ...toRefs(data),
      scoreRef,
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
