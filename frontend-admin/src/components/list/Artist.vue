<template>
  <div class="p-2 border-b border-slate-300 flex justify-between">
    {{ artist.name }}
    <ChevronDoubleRightIcon
      @click="goArtistPage(artist.id)"
      class="h-6 w-6 text-blue-500 cursor-pointer"
    />
  </div>
</template>

<script>
import { ChevronDoubleRightIcon } from "@heroicons/vue/outline";

export default {
  name: "ArtistListItem",
  components: {
    ChevronDoubleRightIcon,
  },
  props: {
    artist: Object,
  },
  data: function () {
    return {};
  },
  mounted() {},
  methods: {
    goArtistPage(id) {
      this.$router.push({ name: "Artist", params: { id } });
    },
  },
  computed: {},
};
</script>

<style scoped>
</style>