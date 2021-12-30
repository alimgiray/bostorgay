<template>
  <div>User: {{ username }}</div>
</template>

<script>
export default {
  name: "User",
  data: function () {
    return {
      username: this.$route.params.username,
    };
  },
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
