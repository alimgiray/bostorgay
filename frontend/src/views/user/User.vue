<template>
  <div></div>
</template>

<script>
export default {
  name: "User",
  components: {},
  data: function () {
    return {
      username: this.$route.params.username,
      playlists: [],
    };
  },
  async mounted() {
    this.playlists = await this.$store.dispatch("getPlaylists", this.username)
  },
  methods: {},
  computed: {},
  watch: {},
};
</script>

<style scoped>
</style>