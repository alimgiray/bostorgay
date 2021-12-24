<template>
  <div class="p-2 flex justify-around border-b-2">
    <div>
      <a class="logo" @click="home">{{ appName }}</a>
    </div>
    <!-- Membership disabled -->
    <!-- <div class="mr-2">
      <div v-if="loggedIn">
        <a class="link mr-2" @click="profile">{{ username }}</a>
        <a class="link" @click="logout">Logout</a>
      </div>
      <div v-else>
        <a class="link mr-2" @click="login">Login</a>
        <a class="link" @click="register">Register</a>
      </div>
    </div> -->
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
    logout() {
      this.$store.dispatch("logout");
      this.$router.push({ name: "Home" });
    },
  },
  computed: {
    username() {
      return this.$store.state.username;
    },
    loggedIn() {
      return this.$store.state.loggedIn;
    },
  },
};
</script>

<style>
</style>