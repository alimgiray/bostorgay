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
      this.player.on("stateChange", (event) => {
        // Song ended
        if (event.data === 0) {
          const nextSong = this.getNextSong();
          if (nextSong) {
            this.$store.commit("playSong", nextSong);
          } else {
            this.$store.commit("clearPlayer");
          }
        }
      });
    },
    getNextSong() {
      if (!this.$store.state.currentSong) {
        return null;
      }
      const currentSongIndex = this.$store.state.queue.findIndex(
        (song) => song.id === this.$store.state.currentSong?.id
      );
      if (
        currentSongIndex !== -1 &&
        this.$store.state.queue.length > currentSongIndex
      ) {
        return this.$store.state.queue[currentSongIndex + 1];
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
        const videoID = this.getVideoIDFromURL(song.url);
        if (videoID) {
          this.player.loadVideoById(videoID);
          this.player.playVideo();
        }
      }
    },
  },
};
</script>

<style scoped>
</style>