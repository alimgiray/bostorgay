<template>
  <div></div>
</template>

<script>
export default {
  name: "Artist",
  components: {},
  data: function () {
    return {
      id: this.$route.params.id,
      artist: null,
      songs: [], // songs of the artist
    };
  },
  async mounted() {
    this.artist = await this.$store.dispatch('getArtist', this.id);
    this.songs = await this.$store.dispatch('getSongsOfArtist', this.id);
  },
  methods: {},
  computed: {},
  watch: {},
};
</script>

<style scoped>
</style>