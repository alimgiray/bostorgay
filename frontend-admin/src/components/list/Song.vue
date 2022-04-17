<template>
  <div class="flex justify-between p-2 border-b border-slate-300">
    <div>
      <div @click="goSongPage(song.id)" class="cursor-pointer">
        {{ song.name }}
      </div>
      <div>
        <span
          v-for="(artist, index) in artists"
          :key="artist.id"
          class="text-sm text-slate-500"
        >
          <a
            @click="goArtistPage(artist.id)"
            class="underline cursor-pointer"
            >{{ artist.name }}</a
          ><span v-if="index < artists.length - 1">, </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SongListItem",
  components: {},
  props: {
    song: Object,
    artists: Array,
    playlistID: Number,
  },
  data: function () {
    return {
      songArtists: [],
    };
  },
  mounted() {},
  methods: {
    goArtistPage(artistID) {
      this.$router.push({ name: "Artist", params: { id: artistID } });
    },
    goSongPage(id) {
      this.$router.push({ name: "Song", params: { id: id } });
    },
  },
  computed: {
    isAdmin() {
      return this.$store.state.user.userType === "admin";
    },
    isEditor() {
      return this.$store.state.user.userType === "editor";
    },
    loggedIn() {
      return this.$store.state.user.loggedIn;
    },
  },
};
</script>

<style scoped>
</style>