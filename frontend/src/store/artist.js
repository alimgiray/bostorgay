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
            return response.json();
          }
          return Promise.reject(response);
        })
        .catch((response) => {
          response.json().then((error) => {
            commit("setNotification", {
              message: error.description,
              isError: true,
            });
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
            return response.json();
          }
          return Promise.reject(response);
        })
        .catch((response) => {
          response.json().then((error) => {
            commit("setNotification", {
              message: error.description,
              isError: true,
            });
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
            return response.json();
          }
          return Promise.reject(response);
        })
        .then((artists) => {
          commit("setArtists", artists);
        })
        .catch((response) => {
          response.json().then((error) => {
            commit("setNotification", {
              message: error.description,
              isError: true,
            });
          });
        });
    },
    async addArtist({ commit, getters }, name) {
      return fetch(`${API_URL}/api/artists`, {
        method: "POST",
        headers: getters.requestHeader,
        body: JSON.stringify({ name }),
      })
        .then((response) => {
          if (response.ok) {
            commit("setNotification", {
              message: "Artist added",
              isError: false,
            });
            return response.json();
          }
          return Promise.reject(response);
        })
        .then((artist) => {
          commit("addArtist", artist);
          return artist.id;
        })
        .catch((response) => {
          response.json().then((error) => {
            commit("setNotification", {
              message: error.description,
              isError: true,
            });
          });
          return false;
        });
    },
    async editArtist({ commit, getters }, { id, name }) {
      return fetch(`${API_URL}/api/artists/${id}`, {
        method: "PUT",
        headers: getters.requestHeader,
        body: JSON.stringify({ name }),
      })
        .then((response) => {
          if (response.ok) {
            commit("setNotification", {
              message: "Artist updated",
              isError: false,
            });
            return response.json();
          }
          return Promise.reject(response);
        })
        .then((artist) => {
          commit("updateArtist", artist);
          return true;
        })
        .catch((response) => {
          response.json().then((error) => {
            commit("setNotification", {
              message: error.description,
              isError: true,
            });
          });
          return false;
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
            return response.json();
          }
          return Promise.reject(response);
        })
        .then((artists) => {
          return artists;
        })
        .catch((response) => {
          response.json().then((error) => {
            commit("setNotification", {
              message: error.description,
              isError: true,
            });
          });
        });
    },
  },
};

export default artistModule;
