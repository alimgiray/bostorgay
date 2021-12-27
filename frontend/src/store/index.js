import { createStore } from "vuex";

const API_URL = import.meta.env.VITE_API_URL || "/";

export default createStore({
  state: {
    loggedIn: false,
    username: "",
    token: "",
    showError: false,
    errorMessage: "",
    songs: [],
    artists: [],
    queue: [],
    currentSong: null,
  },
  mutations: {
    setSongs(state, songs) {
      state.songs = songs;
      localStorage.setItem("songs", JSON.stringify(songs));
    },
    setArtists(state, artists) {
      state.artists = artists;
      localStorage.setItem("artists", JSON.stringify(artists));
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
    // Below is not used
    login(state, { username, token }) {
      state.username = username;
      state.token = token;
      state.loggedIn = true;
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
    },
    logout(state) {
      state.username = "";
      state.token = "";
      state.loggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("songs");
      localStorage.removeItem("artists");
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
    checkSongs({ commit }) {
      const currentSongs = getFromLocalStorage("songs");
      let lastSongID = 0;
      if (currentSongs.length > 0) {
        lastSongID = currentSongs[currentSongs.length - 1].id;
      }
      // TODO: get songs from backend using lastSongID
      const newlyAddedSongs = [
        {
          id: 1,
          name: "Elimdeki Kemane",
          url: "https://www.youtube.com/watch?v=_iOLkj5eclk",
          artists: [1, 2],
        },
        {
          id: 2,
          name: "Qamışım",
          url: "https://www.youtube.com/watch?v=50OmnguhyOE",
          artists: [1, 3],
        },
        {
          id: 3,
          name: "Dahdan Da Endi Bir Kozu",
          url: "https://www.youtube.com/watch?v=arq87TC0OQ0",
          artists: [4],
        },
        {
          id: 4,
          name: "Tipir",
          url: "https://www.youtube.com/watch?v=dhSwvlAFtws",
          artists: [4],
        },
      ];
      const updatedSongs = currentSongs.concat(newlyAddedSongs);
      commit("setSongs", updatedSongs);
    },
    checkArtists({ commit }) {
      const currentArtists = getFromLocalStorage("artists");
      let lastArtistID = 0;
      if (currentArtists.length > 0) {
        lastArtistID = currentArtists[currentArtists.length - 1].id;
      }
      // TODO: get artists from backend using lastArtistID
      const newlyAddedArtists = [
        {
          id: 1,
          name: "Aliye Hacabadinova",
        },
        {
          id: 2,
          name: "Grup Yo-Gurt",
        },
        {
          id: 3,
          name: "Pushkin Klezmer Band",
        },
        {
          id: 4,
          name: "Karolina Cicha",
        },
      ];
      const updatedArtists = currentArtists.concat(newlyAddedArtists);
      commit("setArtists", updatedArtists);
    },
    checkQueue({ state }) {
      state.queue = getFromLocalStorage("queue");
    },
    checkLoginStatus({ commit }) {
      const username = localStorage.getItem("username");
      const token = localStorage.getItem("token");
      if (username && token) {
        commit("login", { username, token });
      } else {
        commit("logout");
      }
    },
    async login({ commit }, { email, password }) {
      return fetch(`${API_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => {
          if (response.ok) {
            commit("clearError");
            return response.json();
          }
          return Promise.reject(response);
        })
        .then((data) => {
          commit("login", data);
          return true;
        })
        .catch((response) => {
          response.json().then((error) => {
            commit("setError", error.description);
          });
          return false;
        });
    },
    async register({ commit }, { username, email, password }) {
      return fetch(`${API_URL}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      })
        .then((response) => {
          if (response.ok) {
            commit("clearError");
            return response.json();
          }
          return Promise.reject(response);
        })
        .then((data) => {
          commit("login", data);
        })
        .catch((response) => {
          response.json().then((error) => {
            commit("setError", error.description);
          });
        });
    },
    logout({ commit }) {
      commit("logout");
    },
  },
  getters: {
    requestHeader(state) {
      return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.token}`,
      };
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
