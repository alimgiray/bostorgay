import { createStore } from "vuex";

import userStore from "./user";
import notificationStore from "./notification";
import artistStore from "./artist";
import songStore from "./song";
import playerStore from "./player";
import playlistStore from "./playlist";

export default createStore({
  modules: {
    user: userStore,
    notification: notificationStore,
    artist: artistStore,
    song: songStore,
    player: playerStore,
    playlist: playlistStore,
  },
  state: {},
  mutations: {},
  actions: {},
});
