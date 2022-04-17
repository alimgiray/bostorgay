import { createStore } from "vuex";

import userStore from "./user";
import notificationStore from "./notification";
import artistStore from "./artist";
import songStore from "./song";

export default createStore({
  modules: {
    user: userStore,
    notification: notificationStore,
    artist: artistStore,
    song: songStore,
  },
  state: {},
  mutations: {},
  actions: {},
});
