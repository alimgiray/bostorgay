import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.css";

createApp(App).use(router).use(store).mixin({
  computed: {
    loggedIn() {
      return this.$store.state.user.loggedIn;
    },
  },
}).mount("#app");
