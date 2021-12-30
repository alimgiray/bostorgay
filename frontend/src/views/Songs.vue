<template>
  <div>Songs</div>
</template>

<script>
export default {
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
