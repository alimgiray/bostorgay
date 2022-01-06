<template>
  <div class="centered-medium">
    <h1 class="page-title">Edit Artist</h1>
    <div>
      <input v-model="name" type="text" placeholder="name" class="auth-input" />
    </div>
    <div class="flex justify-end">
      <button @click="deleteArtist" class="small-button-red mr-2">
        Delete
      </button>
      <button @click="editArtist" class="small-button">Update</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditArtist",
  components: {},
  data: function () {
    return {
      id: this.$route.params.id,
      artist: null,
      name: "",
    };
  },
  async mounted() {
    this.$store.dispatch("checkLoginStatus");
    if (!this.isAdmin && !this.isEditor) {
      this.$router.push({ name: "Home" });
    }
    this.artist = await this.$store.dispatch("getArtist", this.id);
    this.name = this.artist.name;
  },
  methods: {
    editArtist() {
      const success = this.$store.dispatch("editArtist", {
        id: this.id,
        name: this.name,
      });
      if (success) {
        this.$router.push({ name: "Artist", params: { id: this.id } });
      }
    },
    deleteArtist() {
      const success = this.$store.dispatch("deleteArtist", this.id);
      if (success) {
        this.$router.push({ name: "Artists" });
      }
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
