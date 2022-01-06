<template>
  <main id="app" class="font-serif">
    <Notification />
    <Nav />
    <router-view />
    <Collapsable />
  </main>
</template>

<script>
import Nav from "./components/Nav.vue";
import Collapsable from "./components/Collapsable.vue";
import Notification from "./components/utility/Notification.vue";
export default {
  components: {
    Nav,
    Collapsable,
    Notification,
  },
  async mounted() {
    // This order is important
    await this.$store.dispatch("checkLoginStatus");
    await this.$store.dispatch("initQueue");
  },
};
</script>

<style>
</style>
