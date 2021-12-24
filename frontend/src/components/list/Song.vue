<template>
  <div class="flex justify-between">
    <div>
      <div>{{ song.name }}</div>
      <div>
        <span
          v-for="(artist, index) in songArtists"
          :key="artist.id"
          class="text-sm text-slate-500"
        >
          <a @click="console.log(artist.id)" class="underline">{{
            artist.name
          }}</a
          ><span v-if="index < songArtists.length - 1">, </span>
        </span>
      </div>
    </div>
    <div>
      <button>
        <PlayIcon class="m-1 h-5 w-5 text-blue-500" />
      </button>
      <button>
        <PlusIcon class="m-1 h-5 w-5 text-blue-500" />
      </button>
    </div>
  </div>
</template>

<script>
import { PlayIcon, PlusIcon } from "@heroicons/vue/outline";

export default {
  name: "SongListItem",
  components: {
    PlayIcon,
    PlusIcon,
  },
  props: {
    song: Object,
    artistIDs: Array,
  },
  data: function () {
    return {
      songArtists: [],
    };
  },
  mounted() {
    this.songArtists = this.$store.state.artists.filter((artist) =>
      this.artistIDs.includes(artist.id)
    );
  },
  computed: {},
};
</script>

<style scoped>
</style>