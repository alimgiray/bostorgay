<template>
  <div ref="modal" class="absolute w-full z-10 text-white hidden">
    <div class="flex justify-between text-lg py-2 font-bold border-b">
      <div class="mx-3">{{ title }}</div>
      <div class="mx-3 pt-1">
        <XIcon @click="close()" class="h-5 w-5 text-white" />
      </div>
    </div>
    <div class="w-96 mx-auto my-2 px-4 text-slate-100">
      {{ message }}
    </div>
  </div>
</template>

<script>
import { XIcon } from "@heroicons/vue/outline";
export default {
  name: "Notification",
  components: {
    XIcon,
  },
  data: function () {
    return {};
  },
  mounted() {
    if (this.isError) {
      this.$refs.modal.classList.add("bg-red-400");
    } else {
      this.$refs.modal.classList.add("bg-blue-400");
    }
  },
  methods: {
    close() {
      this.$store.commit("clearNotification");
      this.$refs.modal.classList.add("hidden");
    },
  },
  computed: {
    show() {
      return this.$store.state.notification.show;
    },
    message() {
      return this.$store.state.notification.message;
    },
    isError() {
      return this.$store.state.notification.isError;
    },
    title() {
      return this.isError ? "Error" : "Done";
    },
  },
  watch: {
    show: function (newVal) {
      if (newVal) {
        this.$refs.modal.classList.remove("fadeOut");
        this.$refs.modal.classList.remove("hidden");
        this.$refs.modal.classList.add("visible");
        setTimeout(() => {
          this.$store.commit("clearNotification");
        }, 5000);
      } else {
        this.$refs.modal.classList.remove("visible");
        this.$refs.modal.classList.add("fadeOut");
      }
    },
    isError: function (newVal) {
      if (newVal) {
        this.$refs.modal.classList.add("bg-red-400");
        this.$refs.modal.classList.remove("bg-blue-400");
      } else {
        this.$refs.modal.classList.add("bg-blue-400");
        this.$refs.modal.classList.remove("bg-red-400");
      }
    },
  },
};
</script>

<style scoped>
@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.fadeOut {
  animation: fadeOut 1s linear 1 forwards;
}
</style>