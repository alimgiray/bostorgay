<template>
  <div>Artist</div>
</template>

<script>
export default {
  name: "Artist",
  components: {},
  data: function () {
    return {
      id: this.$route.params.id,
      artist: null,
    };
  },
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
