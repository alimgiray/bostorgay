<template>
  <div class="centered-medium">
    <h1 class="page-title">Register</h1>
    <div>
      <input
        v-model="username"
        type="text"
        placeholder="username"
        class="auth-input"
      />
    </div>
    <div>
      <input
        v-model="email"
        type="email"
        placeholder="email"
        class="auth-input"
      />
    </div>
    <div>
      <input
        v-model="password"
        type="password"
        placeholder="password"
        class="auth-input"
      />
    </div>
    <div class="flex justify-end">
      <button @click="register" class="small-button">Register</button>
    </div>
    <div class="mt-4">
      Already have an account? <br />
      Click <a @click="goLoginPage" class="link">here</a> to login.
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  components: {},
  data: function () {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push({ name: "Home" });
    }
  },
  methods: {
    async register() {
      this.$store.dispatch("register", {
        username: this.username,
        email: this.email,
        password: this.password,
      });
    },
    goLoginPage() {
      this.$router.push({ name: "Login" });
    },
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    },
  },
  watch: {
    loggedIn: function (newVal) {
      if (newVal) {
        this.$router.push({ name: "Home" });
      }
    },
  },
};
</script>

<style>
</style>