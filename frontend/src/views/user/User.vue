<template>
  <div class="p-2">
    <div class="text-xl py-1 border-b border-slate-400">
      {{ username }}
      <span
        v-if="
          user?.type === 'admin' ||
          user?.type === 'editor' ||
          user?.type === 'banned'
        "
      >
        <span
          class="py-0.5 px-2 ml-1 rounded-3xl bg-slate-200 text-xs align-center"
        >
          {{ user.type }}
        </span>
      </span>
    </div>
    <div v-if="user" class="py-1 border-b border-slate-400">
      <div>Registered at {{ format(user.createdAt) }}</div>
    </div>
    <div class="mt-1">
      <h1 class="text-center text-lg">Playlists</h1>
      <div
        v-for="playlist in playlists"
        :key="playlist.id"
        class="border-b border-slate-400 py-2"
      >
        <a @click="goPlaylistPage(playlist.id)" class="cursor-pointer"
          >{{ playlist.name }} - {{ playlist.songs.length || 0 }} song(s)</a
        >
      </div>
      <div class="flex justify-end">
        <button @click="goCreatePlaylistPage" class="small-button">
          Create Playlist
        </button>
      </div>
    </div>
    <div v-if="user && isAdmin" class="mt-1">
      <button
        @click="update(user.id, 'editor')"
        v-if="user.type === 'user'"
        class="flex mt-2 py-1 px-2 border border-blue-500"
      >
        Make Editor
      </button>
      <button
        @click="update(user.id, 'user')"
        v-if="user.type === 'editor' || user.type === 'banned'"
        class="flex mt-2 py-1 px-2 border border-blue-500"
      >
        Make User
      </button>
      <button
        v-if="user.type !== 'admin' && user.type !== 'banned'"
        @click="update(user.id, 'banned')"
        class="flex mt-2 py-1 px-2 border border-blue-500"
      >
        Ban This User
      </button>
    </div>
  </div>
</template>

<script>
import time from "../../utils/time";
export default {
  name: "User",
  components: {},
  data: function () {
    return {
      username: this.$route.params.username,
      user: null,
    };
  },
  async mounted() {
    await this.getUser();
  },
  methods: {
    async getUser() {
      this.user = await this.$store.dispatch("getUser", this.username);
      await this.$store.dispatch("getPlaylists");
    },
    format(t) {
      return time.format(t);
    },
    update(id, type) {
      this.$store.dispatch("updateUser", { id, type }).then((user) => {
        this.user = user;
      });
    },
    goPlaylistPage(playlistID) {
      this.$router.push({ name: "Playlist", params: { id: playlistID } });
    },
    goCreatePlaylistPage() {
      this.$router.push({ name: "NewPlaylist" });
    },
  },
  computed: {
    isAdmin() {
      return this.$store.state.user.userType === "admin";
    },
    playlists() {
      return this.$store.state.playlist.playlists;
    },
  },
};
</script>

<style>
</style>
