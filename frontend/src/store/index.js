import { createStore } from "vuex";

import userStore from "./user";
import notificationStore from "./notification";
import artistStore from "./artist";
import songStore from "./song";
import playerStore from "./player";

export default createStore({
  modules: {
    user: userStore,
    notification: notificationStore,
    artist: artistStore,
    song: songStore,
    player: playerStore,
  },
  state: {},
  mutations: {},
  actions: {},
});
