<template>
  <div class="m-2 p-4 border-2 border-pink-100">
    <h2 class="text-3xl">离屏探测</h2>
    <button class="ml-0" @click="toggleDeteictive">
      {{ detecting ? "停止探测" : "开始探测" }}
    </button>
  </div>
</template>

<script>
import { ref, onBeforeUnmount } from "vue";

function OffScreenDetective() {
  const popUpService = {
    event: undefined,
    push(event) {
      this.event = event;
      clearTimeout(this.timer);
      this.timer = this.nextTick();
    },
    timer: -1,
    nextTick() {
      const thisTickTimer = setTimeout(() => {
        if (this.timer === thisTickTimer) {
          alert(this.event);
        }
      }, 100);

      return thisTickTimer;
    },
  };

  function handleVisibilitychange() {
    if (document.visibilityState === "hidden") {
      popUpService.push("页面隐藏");
    }
  }

  function handleBlur() {
    popUpService.push("页面失去焦点");
  }

  function handleFocus() {
    console.log("focus");
  }

  return {
    on() {
      document.addEventListener(
        "visibilitychange",
        handleVisibilitychange,
        false
      );

      window.addEventListener("blur", handleBlur, false);
      window.addEventListener("focus", handleFocus, false);
    },
    off() {
      document.removeEventListener("visibilitychange", handleVisibilitychange);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    },
  };
}

export default {
  setup() {
    const detecting = ref(false);

    const OffScreenDetectiveService = OffScreenDetective();

    onBeforeUnmount(() => OffScreenDetectiveService.off());

    return {
      detecting,
      toggleDeteictive() {
        if (detecting.value) {
          detecting.value = false;
          OffScreenDetectiveService.off();
        } else {
          detecting.value = true;
          OffScreenDetectiveService.on();
        }
      },
    };
  },
};
</script>

<style></style>
