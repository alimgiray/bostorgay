<template>
  <div>Artists</div>
</template>

<script>
export default {
  name: "Artists",
  components: {},
  mounted() {},
  computed: {
    isAdmin() {
      return this.$store.state.user.userType === "admin";
    },
    isEditor() {
      return this.$store.state.user.userType === "editor";
    },
  },
};
</script>

<style>
</style>
