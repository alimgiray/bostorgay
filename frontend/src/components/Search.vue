<template>
  <div class="flex">
    <div class="w-full">
      <input
        v-model="searchTerm"
        @keyup="search"
        type="text"
        placeholder="Search for songs or @artists"
        class="w-full border-b p-2 text-base"
      />
    </div>
    <div class="flex items-center mr-1">
      <button>
        <XIcon @click="clear()" class="h-6 w-6 text-blue-500" />
      </button>
    </div>
  </div>
</template>

<script>
import { XIcon } from "@heroicons/vue/outline";
export default {
  name: "Search",
  components: {
    XIcon,
  },
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
    clear() {
      this.searchTerm = "";
      this.$emit("onResults", this.$store.state.songs);
    },
  },
  computed: {},
};
</script>

<style scoped>
</style>