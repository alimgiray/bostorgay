<template>
  <div>Users</div>
</template>

<script>
export default {
  components: {},
  mounted() {
    this.$store.dispatch("checkLoginStatus");
    if (!this.isAdmin) {
      this.$router.push({ name: "Home" });
    }
  },
  computed: {
    isAdmin() {
      return this.$store.state.userType === "admin";
    },
  },
};
</script>

<style>
</style>
