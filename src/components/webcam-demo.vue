<template>
  <div class="m-2 p-4 border-2 border-pink-100">
    <h2 class="text-3xl">web摄像</h2>
    <button class="ml-0" @click="toggleRecord">
      {{ recoding ? "停止摄像" : "开始摄像" }}
    </button>
    <video ref="videoPlayer" autoplay controls></video>
  </div>
</template>

<script>
import { reactive, toRefs, onUnmounted, onMounted, ref } from "vue";

function CreateAudioRecord(MediaElement) {
  let stream;
  let recorder;
  let recorded;

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
    recorder.ondataavailable = (event) => recorded.push(event.data);
    recorder.start();
  }

  function stop() {
    stream.getTracks().forEach((track) => track.stop());
    recorder.state == "recording" ?? recorder.stop();

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
