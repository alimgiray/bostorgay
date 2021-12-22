<template>
  <main id="app" class="font-serif">
    <Nav />
    <!-- 
      TODO: uncomment this after implementing a proper modal
      <Error /> 
    -->
    <router-view />
  </main>
</template>

<script>
import Nav from "./components/Nav.vue";
import Error from "./components/ErrorModal.vue";
export default {
  components: {
    Error,
    Nav,
  },
  mounted() {
    this.$store.dispatch("checkLoginStatus");
  },
};
</script>

<style>
</style>
