<template>
  <div class="centered-medium">
    <h1 class="page-title">Create Playlist</h1>
    <div>
      <input v-model="name" type="text" placeholder="name" class="auth-input" />
    </div>
    <div class="flex justify-end">
      <button @click="addNewPlaylist" class="small-button">Add</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewPlaylist",
  components: {},
  data: function () {
    return {
      name: "",
    };
  },
  mounted() {
    this.$store.dispatch("checkLoginStatus");
  },
  methods: {
    async addNewPlaylist() {
      const newPlaylistID = await this.$store.dispatch("createPlaylist", {
        name: this.name,
        songs: [],
      });
      if (newPlaylistID) {
        this.$router.push({ name: "Playlist", params: { id: newPlaylistID } });
      }
    },
  },
  computed: {
  },
};
</script>

<style>
</style>
