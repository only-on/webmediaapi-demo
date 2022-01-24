<template>
  <audio-demo></audio-demo>
  <webcam-demo></webcam-demo>
  <off-screen-detective></off-screen-detective>
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
