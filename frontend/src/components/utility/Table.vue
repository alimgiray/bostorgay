<template>
  <div>
    <div>Table</div>
    <div v-for="row in rows" :key="row.id">
      {{ row.id }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: {
    rows: Array,
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