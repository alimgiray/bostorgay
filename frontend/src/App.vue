<template>
  <main id="app" class="font-serif">
    <router-view />
  </main>
</template>

<script>
export default {
  components: {},
  async created() {
    // This order is important
    await this.$store.dispatch("checkLoginStatus");
    await this.$store.dispatch("initQueue");
  }
};
</script>

<style>
</style>
