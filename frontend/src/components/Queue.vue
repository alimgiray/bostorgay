<template>
  <div class="py-2 text-md">
    <div class="text-lg border-b px-2 py-1 bg-slate-200">Song queue</div>
    <div
      class="mt-1 py-1 px-2 border-b cursor-pointer"
      v-for="(song, index) in queue"
      :key="song.id"
    >
      <div class="flex justify-between" @click="playSong(song)">
        <span
          :class="
            song.id !== currentSong?.id ? 'text-slate-500' : 'text-blue-500'
          "
        >
          {{ index + 1 }} - {{ song.name }}
        </span>
        <button>
          <XIcon @click="removeFromQueue(song)" class="h-6 w-6 text-blue-500" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { XIcon } from "@heroicons/vue/outline";
export default {
  name: "Queue",
  components: {
    XIcon,
  },
  data: function () {
    return {};
  },
  mounted() {},
  methods: {
    playSong(song) {
      this.$store.commit("playSong", song);
    },
    removeFromQueue(song) {
      this.$store.commit("removeSongFromQueue", song);
    },
  },
  computed: {
    queue() {
      return this.$store.state.queue;
    },
    currentSong() {
      return this.$store.state.currentSong;
    },
  },
};
</script>

<style scoped>
</style>