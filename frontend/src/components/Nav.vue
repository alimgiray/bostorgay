<template>
  <div class="border-b-2">
    <div class="py-4 flex justify-around border-b">
      <a class="logo" @click="home">{{ appName }}</a>
    </div>
    <div class="flex justify-between py-1 overflow-x-auto">
      <div>
        <button
          class="px-2"
          :id="
            isCurrentPage('Artists') || isCurrentPage('Artist')
              ? 'selectedNavItem'
              : ''
          "
          @click="artistsPage"
        >
          Artists
        </button>
        <button
          class="px-2"
          :id="
            isCurrentPage('Songs') || isCurrentPage('Song')
              ? 'selectedNavItem'
              : ''
          "
          @click="songsPage"
        >
          Songs
        </button>
        <button
          v-if="loggedIn"
          class="px-2"
          :id="
            isCurrentPage('User') || isCurrentPage('Playlist')
              ? 'selectedNavItem'
              : ''
          "
          @click="profile"
        >
          Playlists
        </button>
      </div>
      <div>
        <button
          v-if="isAdmin"
          class="px-2"
          :id="isCurrentPage('Users') ? 'selectedNavItem' : ''"
          @click="usersPage"
        >
          Users
        </button>
        <button v-if="loggedIn" class="px-2" @click="logout">Logout</button>
        <button
          v-if="!loggedIn"
          class="px-2"
          :id="isCurrentPage('Login') ? 'selectedNavItem' : ''"
          @click="login"
        >
          Login
        </button>
        <button
          v-if="!loggedIn"
          class="px-2"
          :id="isCurrentPage('Register') ? 'selectedNavItem' : ''"
          @click="register"
        >
          Register
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
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
      this.$router.push({ name: "User", params: { username: this.username } });
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
    isCurrentPage(page) {
      return page === this.currentPage;
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
    currentPage() {
      return useRouter().currentRoute.value.name;
    },
  },
};
</script>

<style>
</style>