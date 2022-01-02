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
    updateSong(state, updatedSong) {
      state.songs = state.songs.map((song) => {
        if (song.id != updatedSong.id) {
          return song;
        } else {
          return updatedSong;
        }
      });
    },
  },
  actions: {
    async getSong({ commit }, id) {
      return fetch(`${API_URL}/api/songs/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            commit("clearError");
            return response.json();
          }
          return Promise.reject(response);
        })
        .catch((response) => {
          response.json().then((error) => {
            commit("setError", error.description);
          });
        });
    },
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
    editSong({ commit, getters }, { id, name, artists, url, lyrics }) {
      fetch(`${API_URL}/api/songs/${id}`, {
        method: "PUT",
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
          commit("updateSong", song);
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
