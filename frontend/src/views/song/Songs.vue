<template>
  <div>Songs</div>
</template>

<script>
export default {
  name: "Songs",
  components: {},
  mounted() {},
  computed: {
    isAdmin() {
      return this.$store.state.user.userType === "admin";
    },
  },
};
</script>

<style>
</style>
