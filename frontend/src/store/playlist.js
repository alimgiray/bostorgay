const API_URL = import.meta.env.VITE_API_URL || "/";

const playlistModule = {
  state: () => ({
    currentPlaylist: null,
  }),
  mutations: {
    setCurrentPlaylist(state, playlist) {
      state.currentPlaylist = playlist;
    }
  },
  actions: {
    async getPlaylists({ commit, getters, rootState }, username) {
      return await fetch(`${API_URL}/api/playlists/${username}`, {
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
    async getPlaylist({ commit, getters }, id) {
      return await fetch(`${API_URL}/api/playlists/${id}`, {
        headers: getters.requestHeader,
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
    async createPlaylist({ commit, getters }, playlist) {
      return await fetch(`${API_URL}/api/playlists`, {
        method: "POST",
        headers: getters.requestHeader,
        body: JSON.stringify({
          name: playlist.name,
          songs: playlist.songs,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(response);
        })
        .then((playlist) => {
          return playlist.id;
        })
        .catch((response) => {
          response.json().then((error) => {
            commit("setNotification", {
              message: error.description,
              isError: true,
            });
            return 0;
          });
        });
    },
  },
};

export default playlistModule;
