<template>
  <div
    id="collapsable"
    class="fixed bottom-0 max-w-lg w-full bg-gray-300 h-12"
    ref="collapsable"
  >
    <div class="flex justify-between p-2 h-12 align-middle border-b">
      <div class="flex flex-col justify-around">
        <span class="text-center" v-if="!expanded"
          >Currently playing song here</span
        >
      </div>
      <div class="flex flex-col justify-around">
        <ChevronDoubleUpIcon
          v-if="!expanded"
          @click="transform(expanded)"
          class="mx-1 h-6 w-6 text-blue-500"
        />
        <ChevronDoubleDownIcon
          v-if="expanded"
          @click="transform(expanded)"
          class="mx-1 h-6 w-6 text-blue-500"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  ChevronDoubleUpIcon,
  ChevronDoubleDownIcon,
} from "@heroicons/vue/outline";
export default {
  name: "Collapsable",
  components: {
    ChevronDoubleUpIcon,
    ChevronDoubleDownIcon,
  },
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
        this.$refs.collapsable.classList.add("h-4/6");
      } else {
        this.$refs.collapsable.classList.remove("h-4/6");
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