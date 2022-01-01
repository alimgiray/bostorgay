<template>
  <div class="p-2">
    <div class="text-lg w-full text-center">Artists</div>
    <div v-if="isAdmin || isEditor" class="flex justify-end">
      <button
        @click="goNewArtistPage"
        class="border-b border-blue-500 px-4 py-1"
      >
        Add a new artist
      </button>
    </div>
    <div>
      <div v-for="artist in artists" :key="artist.id">
        <div
          @click="goArtistPage(artist.id)"
          class="
            p-2
            border-b border-slate-300
            cursor-pointer
            flex
            justify-between
          "
        >
          {{ artist.name }}
          <ChevronDoubleRightIcon
            @click="view(row)"
            class="h-6 w-6 text-blue-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronDoubleRightIcon } from "@heroicons/vue/outline";

export default {
  name: "Artists",
  components: { ChevronDoubleRightIcon },
  mounted() {
    this.$store.dispatch("getArtists");
  },
  methods: {
    goNewArtistPage() {
      this.$router.push({ name: "NewArtist" });
    },
    goArtistPage(id) {
      this.$router.push({ name: "Artist", params: { id } });
    },
  },
  computed: {
    isAdmin() {
      return this.$store.state.user.userType === "admin";
    },
    isEditor() {
      return this.$store.state.user.userType === "editor";
    },
    artists() {
      return this.$store.state.artist.artists;
    },
  },
};
</script>

<style>
</style>
