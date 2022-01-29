<template>
  <div></div>
</template>

<script>
export default {
  name: "Songs",
  components: {},
  data: function () {
    return {
      songs: [],
    };
  },
  async mounted() {
    this.songs = await this.$store.dispatch("getSongs");
  },
  methods: {},
  computed: {},
  watch: {},
};
</script>

<style scoped>
</style>