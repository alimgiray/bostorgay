<template>
  <div class="centered-medium">
    <h1 class="page-title">Edit Song</h1>
    <div>
      <input v-model="name" type="text" placeholder="name" class="auth-input" />
    </div>
    <div>
      <input
        v-model="artistSearch"
        @keyup="searchArtist"
        type="text"
        placeholder="search artists"
        class="auth-input"
      />
    </div>
    <div>
      <div
        v-for="artist in suggestedArtists"
        :key="artist.id"
        class="flex justify-start"
      >
        <div>
          <PlusIcon
            @click="addSelectedArtist(artist)"
            class="h-6 w-6 text-blue-500 cursor-pointer"
          />
        </div>
        <div class="ml-2">{{ artist.name }}</div>
      </div>
    </div>
    <div>
      <div>Artists</div>
      <div
        v-for="artist in artists"
        :key="artist.id"
        class="flex justify-start"
      >
        <div>
          <MinusIcon
            @click="removeFromSelectedArtists(artist)"
            class="h-6 w-6 text-blue-500 cursor-pointer"
          />
        </div>
        <div class="ml-2">{{ artist.name }}</div>
      </div>
    </div>
    <div class="flex justify-end">
      <button @click="deleteSong" class="small-button-red mr-2">Delete</button>
      <button @click="editSong" class="small-button">Update</button>
    </div>
  </div>
</template>

<script>
import { PlusIcon } from "@heroicons/vue/outline";
import { MinusIcon } from "@heroicons/vue/outline";
export default {
  name: "EditSong",
  components: {
    PlusIcon,
    MinusIcon,
  },
  data: function () {
    return {
      id: this.$route.params.id,
      song: null,
      name: "",
      artistSearch: "",
      artistSearchResults: [],
      artists: [],
    };
  },
  async mounted() {
    this.$store.dispatch("checkLoginStatus");
    if (!this.isAdmin && !this.isEditor) {
      this.$router.push({ name: "Home" });
    }
    this.song = await this.$store.dispatch("getSong", this.id);
    this.name = this.song.name;
    this.artists = this.song.artists;
  },
  methods: {
    editSong() {
      const artistIDs = this.artists.map((artist) => artist.id);
      this.$store.dispatch("editSong", {
        id: this.id,
        name: this.name,
        artists: artistIDs,
      });
    },
    deleteSong() {
      const success = this.$store.dispatch("deleteSong", this.id);
      if (success) {
        this.$router.push({ name: "Songs" });
      }
    },
    async searchArtist() {
      if (this.artistSearch === "") {
        this.artistSearchResults = [];
      } else {
        this.artistSearchResults = await this.$store.dispatch(
          "searchArtists",
          this.artistSearch
        );
      }
    },
    addSelectedArtist(artist) {
      this.artists.push(artist);
      this.artistSearch = "";
      this.artistSearchResults = [];
    },
    removeFromSelectedArtists(artist) {
      this.artists = this.artists.filter(
        (existingArtist) => existingArtist.id != artist.id
      );
    },
  },
  computed: {
    isAdmin() {
      return this.$store.state.user.userType === "admin";
    },
    isEditor() {
      return this.$store.state.user.userType === "editor";
    },
    suggestedArtists() {
      return this.artistSearchResults.filter(
        (artist) =>
          !this.artists.some(
            (selectedArtist) => selectedArtist.id === artist.id
          )
      );
    },
  },
};
</script>

<style>
</style>
