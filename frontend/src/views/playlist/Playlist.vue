<template>
  <div class="p-2">
    <h1 class="text-center text-lg">{{ playlist?.name }}</h1>
    <div>
      <div v-for="song in playlist?.songs" :key="song.id">
        <SongListItem
          :song="song"
          :artists="song.artists"
          :playlistID="playlist?.id"
          @onUpdatePlaylist="refreshPlaylist"
        />
      </div>
      <div v-if="playlist?.songs.length === 0">No songs in this playlist</div>
    </div>
    <div v-if="ownPlaylist" class="flex justify-end mt-2">
      <button @click="deletePlaylist" class="small-button-red mr-2">
        Delete
      </button>
      <button @click="editPlaylist" class="small-button">Change Name</button>
    </div>
  </div>
</template>

<script>
import SongListItem from "../../components/list/Song.vue";
export default {
  name: "Playlist",
  components: {
    SongListItem,
  },
  data: function () {
    return {
      id: this.$route.params.id,
      ownPlaylist: false,
      playlist: null,
    };
  },
  async mounted() {
    this.$store.dispatch("checkLoginStatus");
    if (!this.loggedIn) {
      this.$router.push({ name: "Home" });
    }
    this.playlist = await this.$store.dispatch("getPlaylist", this.id);
    this.ownPlaylist =
      this.playlist.user.username === this.$store.state.user.username;
  },
  methods: {
    async refreshPlaylist() {
      this.playlist = await this.$store.dispatch("getPlaylist", this.id);
    },
  },
  computed: {
    loggedIn() {
      return this.$store.state.user.loggedIn;
    },
  },
};
</script>