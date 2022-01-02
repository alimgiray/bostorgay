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
        <ArtistListItem :artist="artist" />
      </div>
    </div>
  </div>
</template>

<script>
import ArtistListItem from "../../components/list/Artist.vue";
export default {
  name: "Artists",
  components: { ArtistListItem },
  mounted() {
    this.$store.dispatch("getArtists");
  },
  methods: {
    goNewArtistPage() {
      this.$router.push({ name: "NewArtist" });
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
