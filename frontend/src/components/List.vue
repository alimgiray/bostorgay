<template>
  <div>
    <Search @onResults="setResults" />
    <div class="p-2">
      <div v-for="item in list" :key="item.id">
        <ArtistListItem v-if="!item.url" :artist="item" />
        <SongListItem v-if="item.url" :song="item" :artistIDs="item.artists" />
      </div>
    </div>
  </div>
</template>

<script>
import Search from "./Search.vue";
import ArtistListItem from "./list/Artist.vue";
import SongListItem from "./list/Song.vue";
export default {
  name: "List",
  components: {
    Search,
    ArtistListItem,
    SongListItem,
  },
  data: function () {
    return {
      list: [],
    };
  },
  mounted() {
    this.list = this.$store.state.song.songs.slice(-20);
  },
  methods: {
    setResults(results) {
      this.list = results;
    },
  },
  computed: {
    fetchedSongs() {
      return this.$store.state.song.songs;
    },
  },
  watch: {
    fetchedSongs: function () {
      this.list = this.fetchedSongs;
    },
  },
};
</script>

<style scoped>
</style>