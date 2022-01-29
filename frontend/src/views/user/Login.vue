<template>
  <div></div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data: function () {
    return {};
  },
  async mounted() {
    if (this.$isLoggedIn) {
      this.$router.push({ name: "Home" });
    }
  },
  methods: {},
  computed: {},
  watch: {},
};
</script>

<style scoped>
</style>