<template>
  <main id="app" class="font-serif">
    <Notification />
    <Nav />
    <router-view />
  </main>
</template>

<script>
import Nav from "./components/Nav.vue";
import Notification from "./components/utility/Notification.vue";
export default {
  components: {
    Nav,
    Notification,
  },
  async created() {
    // This order is important
    await this.$store.dispatch("checkLoginStatus");
    await this.$store.dispatch("initQueue");
  },
  computed: {
    loggedIn() {
      return this.$store.state.user.loggedIn;
    },
  },
};
</script>

<style>
</style>
