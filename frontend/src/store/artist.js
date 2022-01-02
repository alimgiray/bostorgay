const API_URL = import.meta.env.VITE_API_URL || "/";

const artistModule = {
  state: () => ({
    artists: [],
    suggestions: [],
  }),
  mutations: {
    setArtists(state, artists) {
      state.artists = artists;
    },
    addArtist(state, artist) {
      state.artists.push(artist);
    },
    setArtistSuggestions(state, artists) {
      state.suggestions = artists;
    },
    clearArtistSuggestions(state) {
      state.suggestions = [];
    },
  },
  actions: {
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
    searchArtists({ commit }, query) {
      if (query == "") {
        return;
      }
      fetch(`${API_URL}/api/artists/search?q=${query}`, {
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
          commit("setArtistSuggestions", artists);
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