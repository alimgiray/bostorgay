<template>
  <div>
    <input
      v-model="searchTerm"
      @keyup="search"
      type="text"
      placeholder="Search for songs or @artists"
      class="w-full border-b p-2 text-base"
    />
  </div>
</template>

<script>
export default {
  name: "Search",
  data: function () {
    return {
      searchTerm: "",
    };
  },
  mounted() {},
  methods: {
    search() {
      if (this.searchTerm.startsWith("@")) {
        const artistSearchTerm = this.searchTerm.substring(1);
        const artists = this.$store.state.artists.filter((artist) =>
          artist.name.toLowerCase().includes(artistSearchTerm.toLowerCase())
        );
        this.$emit("onResults", artists);
        return;
      }
      const songs = this.$store.state.songs.filter((song) =>
        song.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.$emit("onResults", songs);
    },
  },
  computed: {},
};
</script>

<style scoped>
</style>