<template>
  <div
    id="collapsable"
    class="
      absolute
      bottom-0
      max-w-lg
      w-full
      border-t border-blue-500
      bg-white
      h-12
    "
    ref="collapsable"
  >
    <div class="flex justify-between p-2 h-12 align-middle border-b">
      <div class="flex flex-col justify-around">
        <span class="text-center">Playing: {{ playerTitle }}</span>
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
    <div>
      <Player v-if="currentSong" />
      <Queue />
    </div>
  </div>
</template>

<script>
import Player from "./Player.vue";
import Queue from "./Queue.vue";

import {
  ChevronDoubleUpIcon,
  ChevronDoubleDownIcon,
} from "@heroicons/vue/outline";
export default {
  name: "Collapsable",
  components: {
    ChevronDoubleUpIcon,
    ChevronDoubleDownIcon,
    Player,
    Queue,
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
        this.$refs.collapsable.classList.add("h-5/6");
      } else {
        this.$refs.collapsable.classList.remove("h-5/6");
        this.$refs.collapsable.classList.add("h-12");
      }
    },
  },
  computed: {
    currentSong() {
      return this.$store.state.player.currentSong ?? false;
    },
    playerTitle() {
      if (this.currentSong) {
        return this.currentSong.name;
      } else {
        return "-";
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