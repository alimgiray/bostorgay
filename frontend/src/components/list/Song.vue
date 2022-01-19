<template>
  <div class="flex justify-between p-2 border-b border-slate-300">
    <div>
      <div @click="goSongPage(song.id)">{{ song.name }}</div>
      <div>
        <span
          v-for="(artist, index) in artists"
          :key="artist.id"
          class="text-sm text-slate-500"
        >
          <a
            @click="goArtistPage(artist.id)"
            class="underline cursor-pointer"
            >{{ artist.name }}</a
          ><span v-if="index < artists.length - 1">, </span>
        </span>
      </div>
    </div>
    <div class="flex items-center">
      <button>
        <PlayIcon @click="play()" class="mx-1 h-6 w-6 text-blue-500" />
      </button>
      <button>
        <TrashIcon
          v-if="playlistID > 0"
          @click="removeFromPlaylist"
          class="mx-1 h-6 w-6 text-blue-500"
        />
        <PlusIcon
          v-else
          @click="addToQueue(false)"
          class="mx-1 h-6 w-6 text-blue-500"
        />
      </button>
      <div
        v-if="showPlaylistPanel"
        class="
          border border-blue-500
          z-10
          absolute
          w-fit
          right-10
          mt-20
          bg-slate-50
          p-2
        "
      >
        <div v-for="playlist in playlists" :key="playlist.id" class="border-b border-blue-500">
          {{playlist.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PlayIcon, PlusIcon, TrashIcon } from "@heroicons/vue/outline";

export default {
  name: "SongListItem",
  components: {
    PlayIcon,
    PlusIcon,
    TrashIcon,
  },
  props: {
    song: Object,
    artists: Array,
    playlistID: Number,
  },
  data: function () {
    return {
      songArtists: [],
      showPlaylistPanel: false,
    };
  },
  mounted() {},
  methods: {
    goArtistPage(artistID) {
      this.$router.push({ name: "Artist", params: { id: artistID } });
    },
    isSongAlreadyInQueue() {
      return this.$store.state.player.queue.some(
        (song) => song.id === this.song.id
      );
    },
    play() {
      if (!this.isSongAlreadyInQueue()) {
        this.addToQueue(true);
      }
      this.$store.commit("playSong", this.song);
    },
    addToQueue(prepend) {
      if (this.loggedIn) {
        this.showPlaylistPanel = !this.showPlaylistPanel;
      }
      if (!this.isSongAlreadyInQueue()) {
        this.$store.commit("addToQueue", { song: this.song, prepend });
      }
    },
    goSongPage(id) {
      this.$router.push({ name: "Song", params: { id: id } });
    },
    async removeFromPlaylist() {
      await this.$store.dispatch("removeSongFromPlaylist", {
        songID: this.song.id,
        playlistID: this.playlistID,
      });
      this.$emit("onUpdatePlaylist");
    },
  },
  computed: {
    isAdmin() {
      return this.$store.state.user.userType === "admin";
    },
    isEditor() {
      return this.$store.state.user.userType === "editor";
    },
    loggedIn() {
      return this.$store.state.user.loggedIn;
    },
    playlists() {
      return this.$store.state.playlist.playlists;
    }
  },
};
</script>

<style scoped>
</style>