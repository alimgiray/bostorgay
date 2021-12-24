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
      return "K_O4BrwHWH4";
    },
    playCurrentSong() {
      this.player.loadVideoById(this.getVideoIDFromURL(this.currentSong));
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
        this.player.loadVideoById(this.getVideoIDFromURL(song.url));
        this.player.playVideo();
      }
    },
  },
};
</script>

<style scoped>
</style>