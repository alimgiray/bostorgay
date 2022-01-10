const API_URL = import.meta.env.VITE_API_URL || "/";

const playlistModule = {
  state: () => ({
    playlists: [],
  }),
  mutations: {
    setPlaylists(state, playlists) {
      state.playlists = playlists;
    },
    replacePlaylist(state, newPlaylist) {
      state.playlists = state.playlists.map((playlist) => {
        if (playlist.id == newPlaylist.id) {
          return newPlaylist;
        }
        return playlist;
      });
    },
  },
  actions: {
    getPlaylists({ commit, getters }) {
      fetch(`${API_URL}/api/playlists`, {
        headers: getters.requestHeader,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(response);
        })
        .then((playlists) => {
          commit("setPlaylists", playlists);
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
      return fetch(`${API_URL}/api/playlists/${id}`, {
        headers: getters.requestHeader,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(response);
        })
        .then((playlist) => {
          return playlist;
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
    removeSongFromPlaylist({ commit, getters, state }, { songID, playlistID }) {
      const playlists = state.playlists.filter(
        (playlist) => playlist.id == playlistID
      );
      if (playlists.length === 0) {
        return;
      }
      const playlist = playlists[0];
      if (!playlist || playlist.songs.length === 0) {
        return;
      }
      const updatedSongsList = playlist.songs.filter(
        (song) => song.id != songID
      );
      fetch(`${API_URL}/api/playlists/${playlistID}`, {
        method: "PUT",
        headers: getters.requestHeader,
        body: JSON.stringify({
          name: playlist.name,
          songs: updatedSongsList,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(response);
        })
        .then((playlist) => {
          commit("replacePlaylist", playlist);
        })
        .catch((response) => {
          console.log(response);
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

export default playlistModule;
