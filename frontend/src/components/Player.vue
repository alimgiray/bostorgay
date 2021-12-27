<template>
  <div class="p-2">
    <div id="player" ref="player" class="w-full"></div>
  </div>
</template>

<script>
import YouTubePlayer from "youtube-player";
export default {
  name: "Player",
  data: function () {
    return {
      player: null,
    };
  },
  mounted() {
    this.player = new YouTubePlayer(this.$refs.player.id);
    if (this.currentSong) {
      this.playCurrentSong();
    }
  },
  methods: {
    getVideoIDFromURL(url) {
      if (!url) return;
      const parsedURL = new URL(url);
      return parsedURL.searchParams.get("v");
    },
    playCurrentSong() {
      this.player.loadVideoById(this.getVideoIDFromURL(this.currentSong?.url));
      this.player.playVideo();
      const nextSong = this.getNextSong();
      this.player.on("stateChange", (event) => {
        // Song ended
        if (event.data === 0) {
          if (nextSong) {
            this.$store.commit("playSong", nextSong);
          } else {
            this.$store.commit("clearPlayer");
          }
        }
      });
    },
    getNextSong() {
      const currentSongIndex = this.$store.state.queue.findIndex(
        (song) => song.id === this.$store.state.currentSong?.id
      );
      if (
        currentSongIndex !== -1 &&
        this.$store.state.queue.length > currentSongIndex + 1
      ) {
        return this.$store.state.queue[currentSongIndex + 1];
      }
      // If no next song, return first one from the list
      if (this.$store.state.queue.length > 0) {
        return this.$store.state.queue[0];
      }
      return null;
    },
  },
  computed: {
    currentSong() {
      return this.$store.state.currentSong;
    },
  },
  watch: {
    currentSong: async function (song) {
      if (song) {
        this.playCurrentSong();
      }
    },
  },
};
</script>

<style scoped>
</style>