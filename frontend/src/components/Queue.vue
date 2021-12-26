<template>
  <div class="py-2 text-md">
    <div class="text-lg border-b px-2 py-1 bg-slate-200">Your queue</div>
    <div
      class="mt-1 py-1 px-2 border-b cursor-pointer"
      v-for="(song, index) in queue"
      :key="song.id"
      @click="playSong(song)"
    >
      <span
        :class="
          song.id !== currentSong?.id ? 'text-slate-500' : 'text-blue-500'
        "
      >
        {{ index + 1 }} - {{ song.name }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Queue",
  data: function () {
    return {};
  },
  mounted() {},
  methods: {
    playSong(song) {
      this.$store.commit("playSong", song);
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