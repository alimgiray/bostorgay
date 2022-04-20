<template>
  <div class="py-2 text-md">
    <div class="flex justify-between text-lg border-b px-2 py-1 bg-slate-200">
      <span>Song queue</span>
      <button>
        <RefreshIcon @click="shuffleQueue()" class="h-6 w-6 text-blue-500" />
      </button>
    </div>
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
        <button v-if="canAddToCurrentPlaylist(song.id)">
          <PlusIcon
            @click="addToCurrentPlaylist(song.id)"
            class="h-6 w-6 text-blue-500"
          />
        </button>
        <button>
          <XIcon @click="removeFromQueue(song)" class="h-6 w-6 text-blue-500" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { RefreshIcon, XIcon, PlusIcon } from "@heroicons/vue/outline";
export default {
  name: "Queue",
  components: {
    XIcon,
    RefreshIcon,
    PlusIcon,
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
    shuffleQueue() {
      this.$store.commit("shuffleQueue");
    },
    canAddToCurrentPlaylist(songID) {
      const currentPlaylist = this.$store.state.playlist.currentPlaylist;
      if (!currentPlaylist) {
        return false;
      }
      const songInPlaylist = currentPlaylist?.songs.find(
        (song) => song.id === songID
      );
      return !songInPlaylist;
    },
    addToCurrentPlaylist(songID) {
      return;
    },
  },
  computed: {
    queue() {
      return this.$store.state.player.queue;
    },
    currentSong() {
      return this.$store.state.player.currentSong;
    },
  },
};
</script>

<style scoped>
</style>