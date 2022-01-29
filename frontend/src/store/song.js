const API_URL = import.meta.env.VITE_API_URL || "/";

const songModule = {
  state: () => ({}),
  mutations: {},
  actions: {
    async getSong({ commit }, id) {
      return fetch(`${API_URL}/api/songs/${id}`, {
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
    async getSongs({ commit }) {
      return await fetch(`${API_URL}/api/songs`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(response);
        })
        .then((songs) => {
          return songs;
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
    searchSongs({ commit }, query) {
      if (query == "") {
        return [];
      }
      return fetch(`${API_URL}/api/songs/search?q=${query}`, {
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
        .then((songs) => {
          return songs;
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

export default songModule;
