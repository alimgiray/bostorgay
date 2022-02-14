<template>
  <div class="centered-medium">
    <h1 class="page-title">Add New Song</h1>
    <div>
      <input v-model="name" type="text" placeholder="name" class="auth-input" />
    </div>
    <div v-if="!file">
      <input v-model="url" type="text" placeholder="url" class="auth-input" />
    </div>
    <div v-if="url == ''" class="flex">
      <input
        type="file"
        accept="audio/*"
        placeholder="file"
        @change="onFileChange"
        class="auth-input"
        ref="audio-input"
      />
      <XIcon
        v-if="file"
        @click="removeFile()"
        class="h-8 w-8 text-blue-500 cursor-pointer self-center"
      />
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
    <div class="flex justify-end">
      <button @click="addNewSong" class="small-button">Add</button>
    </div>
  </div>
</template>

<script>
import { PlusIcon, MinusIcon, XIcon } from "@heroicons/vue/outline";
export default {
  name: "NewSong",
  components: {
    PlusIcon,
    MinusIcon,
    XIcon,
  },
  data: function () {
    return {
      name: "",
      artistSearch: "",
      artistSearchResults: [],
      artists: [],
      url: "",
      file: null,
    };
  },
  mounted() {
    this.$store.dispatch("checkLoginStatus");
    if (!this.isAdmin && !this.isEditor) {
      this.$router.push({ name: "Home" });
    }
  },
  methods: {
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      this.file = files[0];
    },
    removeFile() {
      this.$refs["audio-input"].value = "";
      this.file = null;
    },
    async addNewSong() {
      const artistIDs = this.artists.map((artist) => artist.id);
      const newSong = {
        name: this.name,
        artists: artistIDs,
        url: this.url,
      };
      if (this.file) {
        newSong.file = await this.toBase64(this.file);
      }
      const song = await this.$store.dispatch("addSong", newSong);
      if (song.id) {
        this.$router.push({ name: "Song", params: { id: song.id } });
      } else {
        if (song.status === "in-progress") {
          this.$store.commit("setNotification", {
            message: "Song upload in progress.",
            isError: false,
          });
          this.$router.push({ name: "Songs" });
        }
      }
    },
    async toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
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
