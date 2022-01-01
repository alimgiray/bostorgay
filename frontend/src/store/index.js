import { createStore } from "vuex";

import userModule from "./user";
import errorModule from "./error";
import artistModule from "./artist";

const API_URL = import.meta.env.VITE_API_URL || "/";

export default createStore({
  modules: {
    user: userModule,
    error: errorModule,
    artist: artistModule,
  },
  state: {
    songs: [],
    queue: [],
    currentSong: null,
  },
  mutations: {
    setSongs(state, songs) {
      state.songs = songs;
      localStorage.setItem("songs", JSON.stringify(songs));
    },
    playSong(state, song) {
      state.currentSong = song;
    },
    clearPlayer(state) {
      state.currentSong = null;
    },
    addToQueue(state, { song, prepend = false }) {
      if (prepend) {
        state.queue.unshift(song);
      } else {
        state.queue.push(song);
      }
      localStorage.setItem("queue", JSON.stringify(state.queue));
    },
    removeSongFromQueue(state, song) {
      state.queue = state.queue.filter(
        (songInQueue) => songInQueue.id != song.id
      );
      localStorage.setItem("queue", JSON.stringify(state.queue));
    },
    shuffleQueue(state) {
      state.queue = shuffle(state.queue);
      localStorage.setItem("queue", JSON.stringify(state.queue));
    },
    setError(state, message) {
      state.showError = true;
      if (typeof message === "string") {
        state.errorMessage = message;
      } else {
        state.errorMessage = message.join(",");
      }
    },
    clearError(state) {
      state.showError = false;
      state.errorMessage = "";
    },
  },
  actions: {
    async checkSongs({ commit }) {
      const currentSongs = getFromLocalStorage("songs");
      let lastSongID = 0;
      if (currentSongs.length > 0) {
        lastSongID = currentSongs[currentSongs.length - 1].id;
      }
      const response = await fetch(`${API_URL}/api/songs?after=${lastSongID}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const newlyAddedSongs = await response.json();
        const updatedSongs = currentSongs.concat(newlyAddedSongs);
        commit("setSongs", updatedSongs);
      } else {
        const err = await response.json();
        // TODO show error modal
        console.log(err);
      }
    },
    checkQueue({ state }) {
      state.queue = getFromLocalStorage("queue");
    },
  },
});

function getFromLocalStorage(name) {
  return localStorage.getItem(name)
    ? JSON.parse(localStorage.getItem(name))
    : [];
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
