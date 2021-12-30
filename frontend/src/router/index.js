import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Users from "../views/Users.vue";
import Artists from "../views/Artists.vue";
import Songs from "../views/Songs.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

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
    path: "/artists",
    name: "Artists",
    component: Artists,
  },
  {
    path: "/songs",
    name: "Songs",
    component: Songs,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
