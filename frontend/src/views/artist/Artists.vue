<template>
  <div></div>
</template>

<script>
export default {
  name: "Artists",
  components: {},
  data: function () {
    return {
      artists: [],
    };
  },
  async mounted() {
    this.artists = await this.$store.dispatch('getArtists');
  },
  methods: {},
  computed: {},
  watch: {},
};
</script>

<style scoped>
</style>