<template>
  <div class="flex justify-between py-2">
    <div>
      <div>{{ song.name }}</div>
      <div>
        <span
          v-for="(artist, index) in songArtists"
          :key="artist.id"
          class="text-sm text-slate-500"
        >
          <a
            @click="goArtistPage(artist.id)"
            class="underline cursor-pointer"
            >{{ artist.name }}</a
          ><span v-if="index < songArtists.length - 1">, </span>
        </span>
      </div>
    </div>
    <div class="flex items-center">
      <button>
        <PlayIcon @click="play()" class="mx-1 h-6 w-6 text-blue-500" />
      </button>
      <button>
        <PlusIcon
          @click="addToQueue(false)"
          class="mx-1 h-6 w-6 text-blue-500"
        />
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
  methods: {
    goArtistPage(artistID) {
      // TODO implement after artist page
      console.log(artistID);
    },
    isSongAlreadyInQueue() {
      return this.$store.state.queue.some((song) => song.id === this.song.id);
    },
    play() {
      if (!this.isSongAlreadyInQueue()) {
        this.addToQueue(true);
      }
      this.$store.commit("playSong", this.song);
    },
    addToQueue(prepend) {
      if (!this.isSongAlreadyInQueue()) {
        this.$store.commit("addToQueue", { song: this.song, prepend });
      }
    },
  },
  computed: {},
};
</script>

<style scoped>
</style>