<template>
  <div>{{ artist.name }}</div>
</template>

<script>
export default {
  name: "ArtistListItem",
  props: {
    artist: Object,
  },
  data: function () {
    return {};
  },
  mounted() {},
  computed: {},
};
</script>

<style scoped>
</style>