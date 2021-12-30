<template>
  <div class="border-b-2">
    <div class="py-4 flex justify-around border-b">
      <a class="logo" @click="home">{{ appName }}</a>
    </div>
    <div class="flex justify-between py-1 overflow-x-auto">
      <div>
        <button class="px-2" @click="artistsPage">Artists</button>
        <button class="px-2" @click="songsPage">Songs</button>
      </div>
      <div>
        <button v-if="isAdmin" class="px-2" @click="usersPage">Users</button>
        <button v-if="loggedIn" class="px-2" @click="profile">Profile</button>
        <button v-if="loggedIn" class="px-2" @click="logout">Logout</button>
        <button v-if="!loggedIn" class="px-2" @click="login">Login</button>
        <button v-if="!loggedIn" class="px-2" @click="register">
          Register
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nav",
  components: {},
  data: function () {
    return {
      appName: import.meta.env.VITE_APP_NAME || "App Name",
    };
  },
  mounted() {},
  methods: {
    login() {
      this.$router.push({ name: "Login" });
    },
    register() {
      this.$router.push({ name: "Register" });
    },
    home() {
      this.$router.push({ name: "Home" });
    },
    profile() {
      console.log("Not implemented");
    },
    usersPage() {
      this.$router.push({ name: "Users" });
    },
    artistsPage() {
      this.$router.push({ name: "Artists" });
    },
    songsPage() {
      this.$router.push({ name: "Songs" });
    },
    logout() {
      this.$store.commit("logout");
      this.$router.push({ name: "Home" });
    },
  },
  computed: {
    username() {
      return this.$store.state.user.username;
    },
    loggedIn() {
      return this.$store.state.user.loggedIn;
    },
    isAdmin() {
      return this.$store.state.user.userType === "admin";
    },
  },
};
</script>

<style>
</style>