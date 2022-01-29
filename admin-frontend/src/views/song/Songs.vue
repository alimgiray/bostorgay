<template>
  <div class="p-2">
    <div class="text-lg w-full text-center">Songs</div>
    <div v-if="isAdmin || isEditor" class="flex justify-end">
      <button @click="goNewSongPage" class="border-b border-blue-500 px-4 py-1">
        Add a new song
      </button>
    </div>
    <div>
      <div v-for="song in songs" :key="song.id">
        <SongListItem v-if="song.url" :song="song" :artists="song.artists" />
      </div>
    </div>
  </div>
</template>

<script>
import SongListItem from "../../components/list/Song.vue";

export default {
  name: "Songs",
  components: {
    SongListItem,
  },
  mounted() {
    this.$store.dispatch("getSongs");
  },
  methods: {
    goNewSongPage() {
      this.$router.push({ name: "NewSong" });
    },
  },
  computed: {
    isAdmin() {
      return this.$store.state.user.userType === "admin";
    },
    isEditor() {
      return this.$store.state.user.userType === "editor";
    },
    songs() {
      return this.$store.state.song.songs;
    },
  },
};
</script>

<style>
</style>
