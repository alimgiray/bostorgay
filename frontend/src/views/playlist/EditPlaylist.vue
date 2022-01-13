<template>
  <div class="centered-medium">
    <h1 class="page-title">Edit Playlist</h1>
    <div>
      <input v-model="name" type="text" placeholder="name" class="auth-input" />
    </div>
    <div class="flex justify-end">
      <button @click="editPlaylist" class="small-button">Update</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditPlaylist",
  components: {},
  data: function () {
    return {
      id: this.$route.params.id,
      playlist: null,
      name: "",
    };
  },
  async mounted() {
    this.$store.dispatch("checkLoginStatus");
    this.playlist = await this.$store.dispatch("getPlaylist", this.id);
    if (this.playlist.user.username != this.username) {
      this.$router.push({ name: "Home" });
    }
    this.name = this.playlist.name;
  },
  methods: {
    editPlaylist() {
      const success = this.$store.dispatch("editPlaylistName", {
        id: this.id,
        name: this.name,
        songs: this.songs,
      });
      if (success) {
        this.$router.push({ name: "Playlist", params: { id: this.id } });
      }
    },
  },
  computed: {
    username() {
      return this.$store.state.user.username
    },

  },
};
</script>

<style>
</style>
