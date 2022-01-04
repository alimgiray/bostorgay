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
    <div v-if="searchTerm != ''" class="flex items-center mr-1">
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
    async search() {
      if (this.searchTerm.startsWith("@")) {
        const artistSearchTerm = this.searchTerm.substring(1);
        const artists = await this.$store.dispatch(
          "searchArtists",
          artistSearchTerm
        );
        this.$emit("onResults", artists);
        return;
      }
      const songs = await this.$store.dispatch("searchSongs", this.searchTerm);
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