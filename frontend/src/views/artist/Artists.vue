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
      return this.$store.state.userType === "admin";
    },
  },
};
</script>

<style>
</style>
