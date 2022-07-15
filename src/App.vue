<template>
  <audio-demo></audio-demo>
  <webcam-demo></webcam-demo>
  <off-screen-detective></off-screen-detective>
  <input type="text" style="width:300px;border:1px solid pink">
</template>

<script>
import AudioDemo from "./components/audio-demo.vue";
import WebcamDemo from "./components/webcam-demo.vue";
import OffScreenDetective from "./components/off-screen-detective.vue";

export default {
  components: {
    AudioDemo,
    WebcamDemo,
    OffScreenDetective,
  },
};
</script>

<style></style>
