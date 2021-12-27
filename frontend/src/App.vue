<template>
  <main id="app" class="font-serif">
    <Nav />
    <router-view />
  </main>
</template>

<script>
import Nav from "./components/Nav.vue";
export default {
  components: {
    Nav,
  },
  mounted() {
    this.$store.dispatch("checkLoginStatus");
    this.$store.dispatch("checkSongs");
    this.$store.dispatch("checkArtists");
    this.$store.dispatch("checkQueue");
  },
};
</script>

<style>
</style>
