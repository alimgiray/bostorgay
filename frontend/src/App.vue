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
  async mounted() {
    // This order is important
    await this.$store.dispatch("checkLoginStatus");
    await this.$store.dispatch("checkArtists");
    await this.$store.dispatch("checkSongs");
    await this.$store.dispatch("checkQueue");
  },
};
</script>

<style>
</style>
