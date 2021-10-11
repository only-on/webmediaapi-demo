<template>
  <div class="m-2 p-4 border-2 border-pink-100">
    <h2 class="text-3xl">web录音</h2>
    <button class="ml-0" @click="toggleRecord">
      {{ recoding ? "停止录音" : "开始录音" }}
    </button>
    <button
      :disabled="!replayable"
      class="
        disabled:cursor-not-allowed
        disabled:bg-indigo-100
        disabled:text-indigo-300
      "
      @click="replay"
    >
      {{ replaying ? "停止" : "播放录音" }}
    </button>
    <audio ref="audioPlayer" autoplay></audio>
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
    });

    MediaElement.srcObject = stream;

    recorded = [];
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (event) => recorded.push(event.data);
    recorder.start();
  }

  function stop() {
    stream.getTracks().forEach((track) => track.stop());
    recorder.state == "recording" ?? recorder.stop();
  }

  function replay() {
    MediaElement.pause();
    MediaElement.currentTime = 0;
    MediaElement.srcObject = undefined;
    MediaElement.src = URL.createObjectURL(new Blob(recorded));
  }

  function stopReplay() {
    MediaElement.pause();
    MediaElement.currentTime = 0;
    MediaElement.srcObject = undefined;
    MediaElement.src = undefined;
  }

  return {
    record,
    stop,
    replay,
    stopReplay,
    destroy: () => (stream = MediaElement = recorded = null),
  };
}

export default {
  setup() {
    const audioPlayer = ref(null);

    const data = reactive({
      recoding: false,
      replayable: false,
      replaying: false,
    });

    let Record;

    onMounted(() => (Record = CreateAudioRecord(audioPlayer.value)));

    onUnmounted(() => Record.destroy());

    // do some magic thing

    return {
      ...toRefs(data),
      audioPlayer,
      toggleRecord: () => {
        data.replaying = false;

        if (data.recoding) {
          Record.stop();
          Record.stopReplay();
          data.replayable = true;
        } else {
          Record.record();
          data.replayable = false;
        }

        data.recoding = !data.recoding;
      },
      replay: () => {
        if (data.replaying) {
          Record.stopReplay();
          data.replaying = false;
        } else {
          Record.replay();
          data.replaying = true;
        }
      },
    };
  },
};
</script>

<style></style>
