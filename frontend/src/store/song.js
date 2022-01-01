const API_URL = import.meta.env.VITE_API_URL || "/";

const songModule = {
  state: () => ({
    songs: [],
  }),
  mutations: {
    setSongs(state, songs) {
      state.songs = songs;
    },
    addSong(state, song) {
      state.songs.push(song);
    },
  },
  actions: {
    getSongs({ commit }) {
      fetch(`${API_URL}/api/songs`)
        .then((response) => {
          if (response.ok) {
            commit("clearError");
            return response.json();
          }
          return Promise.reject(response);
        })
        .then((songs) => {
          commit("setSongs", songs);
        })
        .catch((response) => {
          response.json().then((error) => {
            commit("setError", error.description);
          });
        });
    },
    addSong({ commit, getters }, { name, artists, url, lyrics }) {
      fetch(`${API_URL}/api/songs`, {
        method: "POST",
        headers: getters.requestHeader,
        body: JSON.stringify({ name, artists, url, lyrics }),
      })
        .then((response) => {
          if (response.ok) {
            commit("clearError");
            return response.json();
          }
          return Promise.reject(response);
        })
        .then((song) => {
          commit("addSong", song);
        })
        .catch((response) => {
          response.json().then((error) => {
            commit("setError", error.description);
          });
        });
    },
  },
};

export default songModule;
