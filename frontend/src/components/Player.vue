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
    this.player = YouTubePlayer(this.$refs.player.id);
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