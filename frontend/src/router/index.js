import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";

import Users from "../views/user/Users.vue";
import User from "../views/user/User.vue";

import Artists from "../views/artist/Artists.vue";
import Artist from "../views/artist/Artist.vue";
import NewArtist from "../views/artist/NewArtist.vue";
import EditArtist from "../views/artist/EditArtist.vue";

import Songs from "../views/song/Songs.vue";
import Song from "../views/song/Song.vue";
import NewSong from "../views/song/NewSong.vue";
import EditSong from "../views/song/EditSong.vue";

import Playlist from "../views/playlist/Playlist.vue";

import Login from "../views/user/Login.vue";
import Register from "../views/user/Register.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
    path: "/users",
    name: "Users",
    component: Users,
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
    path: "/artist/new",
    name: "NewArtist",
    component: NewArtist,
  },
  {
    path: "/artist/edit/:id",
    name: "EditArtist",
    component: EditArtist,
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
    path: "/song/new",
    name: "NewSong",
    component: NewSong,
  },
  {
    path: "/song/edit/:id",
    name: "EditSong",
    component: EditSong,
  },
  {
    path: "/song/:id",
    name: "Song",
    component: Song,
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
