import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import FAQ from "../views/FAQ.vue";

import User from "../views/user/User.vue";
import Playlist from "../views/playlist/Playlist.vue";

import Artists from "../views/artist/Artists.vue";
import Artist from "../views/artist/Artist.vue";

import Songs from "../views/song/Songs.vue";

import Login from "../views/user/Login.vue";
import Register from "../views/user/Register.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/faq",
    name: "FAQ",
    component: FAQ,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/user/:username",
    name: "User",
    component: User,
  },
  {
    path: "/artists",
    name: "Artists",
    component: Artists,
  },
  {
    path: "/artist/:id",
    name: "Artist",
    component: Artist,
  },
  {
    path: "/songs",
    name: "Songs",
    component: Songs,
  },
  {
    path: "/playlist/:id",
    name: "Playlist",
    component: Playlist,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
