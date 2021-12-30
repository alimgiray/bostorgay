<template>
  <div>Song</div>
</template>

<script>
export default {
  name: "Song",
  components: {},
  data: function () {
    return {
      id: this.$route.params.id,
      song: null,
    };
  },
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
