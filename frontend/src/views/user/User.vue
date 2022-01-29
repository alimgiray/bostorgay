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
        class="border-b border-slate-400 py-2 flex justify-between"
      >
        <a @click="goPlaylistPage(playlist.id)" class="cursor-pointer"
          >{{ playlist.name }} - {{ playlist.songs?.length || 0 }} song(s)</a
        >
        <PlayIcon
          @click="play(playlist.id)"
          class="mx-1 h-6 w-6 text-blue-500 cursor-pointer"
        />
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
import { PlayIcon } from "@heroicons/vue/outline";
import time from "../../utils/time";
export default {
  name: "User",
  components: {
    PlayIcon,
  },
  data: function () {
    return {
      username: this.$route.params.username,
      user: null,
      ownPage: false,
    };
  },
  async mounted() {
    await this.getUser();
    this.ownPage = this.user.username === this.$store.state.user.username;
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
    play(playlistID) {
      // If own page, playlist already loaded
      if (this.ownPage) {
        const playlists = this.$store.state.playlist.playlists.filter(
          (playlist) => playlist.id === playlistID
        );
        if (playlists.length === 0) {
          this.$store.commit("setNotification", {
            message: "Playlist not found",
            isError: true,
          });
          return;
        }
        const playlist = playlists[0];
        if (!playlist || !playlist.songs || playlist.songs.length === 0) {
          this.$store.commit("setNotification", {
            message: "Playlist has no songs",
            isError: true,
          });
          return;
        }
        // this.$store.commit("setQueueFromPlaylist", playlist);
        this.$store.commit("setCurrentPlaylist", playlist);
      }
    },
  },
  computed: {
    isAdmin() {
      return this.$store.state.user.userType === "admin";
    },
    playlists() {
      // TODO get user's playlist from backend and also show them (a.k.a. public playlists)
      return this.$store.state.playlist.playlists;
    },
  },
};
</script>

<style>
</style>
