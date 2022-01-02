<template>
  <div class="centered-medium">
    <h1 class="page-title">Add New Song</h1>
    <div>
      <input v-model="name" type="text" placeholder="name" class="auth-input" />
    </div>
    <div>
      <input v-model="url" type="text" placeholder="url" class="auth-input" />
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
    <div>
      <textarea
        v-model="lyrics"
        rows="10"
        type="text"
        placeholder="lyrics"
        class="auth-input"
      />
    </div>
    <div class="flex justify-end">
      <button @click="addNewSong" class="small-button">Add</button>
    </div>
  </div>
</template>

<script>
import { PlusIcon } from "@heroicons/vue/outline";
import { MinusIcon } from "@heroicons/vue/outline";
export default {
  name: "Artist",
  components: {
    PlusIcon,
    MinusIcon,
  },
  data: function () {
    return {
      name: "",
      artistSearch: "",
      artists: [],
      url: "",
      lyrics: "",
    };
  },
  mounted() {
    this.$store.dispatch("checkLoginStatus");
    if (!this.isAdmin && !this.isEditor) {
      this.$router.push({ name: "Home" });
    }
  },
  methods: {
    addNewSong() {
      const artistIDs = this.artists.map((artist) => artist.id);
      this.$store.dispatch("addSong", {
        name: this.name,
        artists: artistIDs,
        url: this.url,
        lyrics: this.lyrics,
      });
    },
    searchArtist() {
      if (this.artistSearch === "") {
        this.$store.commit("clearArtistSuggestions");
      } else {
        this.$store.dispatch("searchArtists", this.artistSearch);
      }
    },
    addSelectedArtist(artist) {
      this.artists.push(artist);
      this.artistSearch = "";
      this.$store.commit("clearArtistSuggestions");
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
      return this.$store.state.artist.suggestions.filter(
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
