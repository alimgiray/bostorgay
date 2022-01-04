const API_URL = import.meta.env.VITE_API_URL || "/";

const artistModule = {
  state: () => ({
    artists: [],
  }),
  mutations: {
    setArtists(state, artists) {
      state.artists = artists;
    },
    addArtist(state, artist) {
      state.artists.push(artist);
    },
    updateArtist(state, updatedArtist) {
      state.artists = state.artists.map((artist) => {
        if (artist.id != updatedArtist.id) {
          return artist;
        } else {
          return updatedArtist;
        }
      });
    },
  },
  actions: {
    async getArtist({ commit }, id) {
      return fetch(`${API_URL}/api/artists/${id}`, {
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
    async getSongsOfArtist({ commit }, id) {
      return fetch(`${API_URL}/api/artists/${id}/songs`, {
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
    getArtists({ commit }) {
      fetch(`${API_URL}/api/artists`, {
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
        .then((artists) => {
          commit("setArtists", artists);
        })
        .catch((response) => {
          response.json().then((error) => {
            commit("setError", error.description);
          });
        });
    },
    addArtist({ commit, getters }, name) {
      fetch(`${API_URL}/api/artists`, {
        method: "POST",
        headers: getters.requestHeader,
        body: JSON.stringify({ name }),
      })
        .then((response) => {
          if (response.ok) {
            commit("clearError");
            return response.json();
          }
          return Promise.reject(response);
        })
        .then((artist) => {
          commit("addArtist", artist);
        })
        .catch((response) => {
          response.json().then((error) => {
            commit("setError", error.description);
          });
        });
    },
    editArtist({ commit, getters }, { id, name }) {
      fetch(`${API_URL}/api/artists/${id}`, {
        method: "PUT",
        headers: getters.requestHeader,
        body: JSON.stringify({ name }),
      })
        .then((response) => {
          if (response.ok) {
            commit("clearError");
            return response.json();
          }
          return Promise.reject(response);
        })
        .then((artist) => {
          commit("updateArtist", artist);
        })
        .catch((response) => {
          response.json().then((error) => {
            commit("setError", error.description);
          });
        });
    },
    searchArtists({ commit }, query) {
      if (query == "") {
        return [];
      }
      return fetch(`${API_URL}/api/artists/search?q=${query}`, {
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
        .then((artists) => {
          return artists;
        })
        .catch((response) => {
          response.json().then((error) => {
            commit("setError", error.description);
          });
        });
    },
  },
};

export default artistModule;
