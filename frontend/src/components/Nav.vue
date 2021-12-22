<template>
  <div class="p-2 flex justify-between border-b-2">
    <div><a class="logo" @click="home">LOGO</a></div>
    <div class="mr-2">
      <div v-if="loggedIn">
        <a class="link mr-2" @click="profile">{{ username }}</a>
        <a class="link" @click="logout">Logout</a>
      </div>
      <div v-else>
        <a class="link mr-2" @click="login">Login</a>
        <a class="link" @click="register">Register</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nav",
  components: {},
  data: function () {
    return {};
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