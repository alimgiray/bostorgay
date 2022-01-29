<template>
  <div class="p-2">
    <div class="text-lg w-full text-center">{{ artist?.name }}</div>
    <div v-if="isAdmin || isEditor" class="flex justify-end">
      <button
        @click="goEditArtistPage"
        class="border-b border-blue-500 px-4 py-1"
      >
        Edit artist
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
  name: "Artist",
  components: {
    SongListItem,
  },
  data: function () {
    return {
      id: this.$route.params.id,
      artist: null,
      songs: [],
    };
  },
  async mounted() {
    this.artist = await this.$store.dispatch("getArtist", this.id);
    this.songs = await this.$store.dispatch("getSongsOfArtist", this.id);
  },
  methods: {
    goEditArtistPage() {
      this.$router.push({ name: "EditArtist", params: { id: this.artist.id } });
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
