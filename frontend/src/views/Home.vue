<template>
  <div id="home">
    <Player v-if="currentSong" />
    <Queue />
    <List />
  </div>
</template>

<script>
import Player from "../components/Player.vue";
import Queue from "../components/Queue.vue";
import List from "../components/List.vue";

export default {
  name: "Home",
  components: {
    List,
    Queue,
    Player,
  },
  async mounted() {},
  computed: {
    currentSong() {
      return this.$store.state.currentSong ?? false;
    },
  },
};
</script>

<style scoped>
</style>