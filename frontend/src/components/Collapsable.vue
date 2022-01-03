<template>
  <div
    id="collapsable"
    class="fixed bottom-0 max-w-lg w-full bg-gray-300 h-12"
    ref="collapsable"
  >
    <div class="bg-gray-400 flex justify-between">
      <div><span v-if="!expanded">Player here</span></div>
      <ChevronDoubleUpIcon
        @click="transform(expanded)"
        class="mx-1 h-6 w-6 text-blue-500"
      />
    </div>
  </div>
</template>

<script>
import { ChevronDoubleUpIcon } from "@heroicons/vue/outline";
export default {
  name: "Collapsable",
  components: { ChevronDoubleUpIcon },
  data: function () {
    return {
      expanded: false,
    };
  },
  methods: {
    transform() {
      this.expanded = !this.expanded;
      if (this.expanded) {
        this.$refs.collapsable.classList.remove("h-12");
        this.$refs.collapsable.classList.add("h-64");
      } else {
        this.$refs.collapsable.classList.remove("h-64");
        this.$refs.collapsable.classList.add("h-12");
      }
    },
  },
};
</script>

<style scoped>
#collapsable {
  transition: 0.5s;
}
</style>