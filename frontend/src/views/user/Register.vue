<template>
  <div></div>
</template>

<script>
export default {
  name: "Register",
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