<template>
  <div class="p-2">
    <div class="text-lg w-full text-center">{{ song?.name }}</div>
    <div v-if="isAdmin || isEditor" class="flex justify-end">
      <button
        @click="goEditSongPage"
        class="border-b border-blue-500 px-4 py-1"
      >
        Edit song
      </button>
    </div>
    <div>
      <div class="py-1 border-b border-slate-400">
        <h1>URL:</h1>
        <a :href="song?.url" target="_blank">{{ song?.url }}</a>
      </div>
      <div class="py-1 border-b border-slate-400">
        <h1>Artists:</h1>
        <div v-for="artist in song?.artists" :key="artist.id">
          - <a @click="goArtistPage(artist.id)">{{ artist.name }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Song",
  components: {},
  data: function () {
    return {
      id: this.$route.params.id,
      song: null,
    };
  },
  async mounted() {
    this.song = await this.$store.dispatch("getSong", this.id);
  },
  methods: {
    goEditSongPage() {
      this.$router.push({ name: "EditSong", params: { id: this.id } });
    },
    goArtistPage(id) {
      this.$router.push({ name: "Artist", params: { id } });
    },
  },
  computed: {
    isAdmin() {
      return this.$store.state.user.userType === "admin";
    },
    isEditor() {
      return this.$store.state.user.userType === "editor";
    },
  },
};
</script>

<style>
</style>
