<template>
  <main id="app" class="font-serif">
    <ErrorModal />
    <Nav />
    <router-view />
    <Collapsable />
  </main>
</template>

<script>
import Nav from "./components/Nav.vue";
import Collapsable from "./components/Collapsable.vue";
import ErrorModal from "./components/utility/ErrorModal.vue";
export default {
  components: {
    Nav,
    Collapsable,
    ErrorModal,
  },
  async mounted() {
    // This order is important
    await this.$store.dispatch("checkLoginStatus");
    await this.$store.dispatch("checkQueue");
  },
};
</script>

<style>
</style>
