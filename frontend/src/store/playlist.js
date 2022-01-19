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
    deletePlaylist(state, deletedPlaylistID) {
      state.playlists = state.playlists.filter(
        (playlist) => playlist.id != deletedPlaylistID
      );
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
    removeSongFromPlaylist({ dispatch, state }, { songID, playlistID }) {
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
      playlist.songs = updatedSongsList;
      dispatch("updatePlaylist", {
        id: playlist.id,
        name: playlist.name,
        songs: playlist.songs,
      });
    },
    addSongToPlaylist({ dispatch, state }, { songID, playlistID }) {
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
      playlist.songs.push(songID);
      dispatch("updatePlaylist", {
        id: playlist.id,
        name: playlist.name,
        songs: playlist.songs,
      });
    },
    editPlaylistName({ dispatch }, playlist) {
      dispatch("updatePlaylist", {
        id: playlist.id,
        name: playlist.name,
        songs: playlist.songs,
      });
    },
    async updatePlaylist({ commit, getters }, { id, name, songs }) {
      return fetch(`${API_URL}/api/playlists/${id}`, {
        method: "PUT",
        headers: getters.requestHeader,
        body: JSON.stringify({
          name,
          songs: songs ?? [],
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
          response.json().then((error) => {
            commit("setNotification", {
              message: error.description,
              isError: true,
            });
          });
        });
    },
    async deletePlaylist({ commit, getters }, id) {
      return fetch(`${API_URL}/api/playlists/${id}`, {
        method: "DELETE",
        headers: getters.requestHeader,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(response);
        })
        .then(() => {
          commit("deletePlaylist", id);
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

export default playlistModule;
