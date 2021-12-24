<template>
  <div id="home">
    <Queue />
    <List />
  </div>
</template>

<script>
import List from "../components/List.vue";
import Queue from "../components/Queue.vue";
export default {
  name: "Home",
  components: {
    List,
    Queue,
  },
  async mounted() {},
};
</script>

<style scoped>
</style>