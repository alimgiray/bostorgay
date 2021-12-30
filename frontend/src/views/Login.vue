<template>
  <div class="centered-medium">
    <h1 class="page-title">Login</h1>
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
      <button @click="login" class="small-button">Login</button>
    </div>
    <div class="mt-4">
      Don't have an account? <br />
      Click <a @click="goRegisterPage" class="link">here</a> to register.
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data: function () {
    return {
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
    async login() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });
    },
    goRegisterPage() {
      this.$router.push({ name: "Register" });
    },
  },
  computed: {
    loggedIn() {
      return this.$store.state.user.loggedIn;
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