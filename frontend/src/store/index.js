import { createStore } from "vuex";

import userStore from "./user";
import errorStore from "./error";
import artistStore from "./artist";
import songStore from "./song";

export default createStore({
  modules: {
    user: userStore,
    error: errorStore,
    artist: artistStore,
    song: songStore,
  },
  state: {
    queue: [],
    currentSong: null,
  },
  mutations: {
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
  },
  actions: {
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
