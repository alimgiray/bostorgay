<template>
  <div>{{ song.name }} - {{ artists }}</div>
</template>

<script>
export default {
  name: "SongListItem",
  props: {
    song: Object,
    artists: Array,
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