<template>
  <div class="centered-medium">
    <h1 class="page-title">Add New Artist</h1>
    <div>
      <input v-model="name" type="text" placeholder="name" class="auth-input" />
    </div>
    <div class="flex justify-end">
      <button @click="addNewArtist" class="small-button">Add</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Artist",
  components: {},
  data: function () {
    return {
      name: "",
    };
  },
  mounted() {
    this.$store.dispatch("checkLoginStatus");
    if (!this.isAdmin && !this.isEditor) {
      this.$router.push({ name: "Home" });
    }
  },
  methods: {
    addNewArtist() {
      this.$store.dispatch("addArtist", this.name);
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
