<template>
  <div ref="errorModal" class="absolute w-full z-10 text-white bg-red-400">
    <div class="flex justify-between text-lg py-2 font-bold border-b">
      <div class="mx-3">Error</div>
      <div class="mx-3 pt-1">
        <XIcon @click="close()" class="h-5 w-5 text-white" />
      </div>
    </div>
    <div class="w-96 h-24 ml-auto mr-auto mt-2 px-4 text-slate-100">
      {{ message }}
    </div>
  </div>
</template>

<script>
import { XIcon } from "@heroicons/vue/outline";
export default {
  name: "ErrorModal",
  components: {
    XIcon,
  },
  data: function () {
    return {};
  },
  mounted() {
    this.$refs.errorModal.classList.add("hidden");
  },
  methods: {
    close() {
      this.$store.commit("clearError");
      this.$refs.errorModal.classList.add("hidden");
    },
  },
  computed: {
    show() {
      return this.$store.state.error.showError;
    },
    message() {
      return this.$store.state.error.errorMessage;
    },
  },
  watch: {
    show: function (newVal) {
      if (newVal) {
        this.$refs.errorModal.classList.remove("fadeOut");
        this.$refs.errorModal.classList.remove("hidden");
        this.$refs.errorModal.classList.add("visible");
        setTimeout(() => {
          this.$store.commit("clearError");
        }, 5000);
      } else {
        this.$refs.errorModal.classList.remove("visible");
        this.$refs.errorModal.classList.add("fadeOut");
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