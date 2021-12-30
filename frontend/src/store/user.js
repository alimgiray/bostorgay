const API_URL = import.meta.env.VITE_API_URL || "/";

const userModule = {
  state: () => ({
    loggedIn: false,
    username: "",
    token: "",
    userType: "",
  }),
  mutations: {
    login(state, { username, token, type }) {
      state.username = username;
      state.token = token;
      state.userType = type;
      state.loggedIn = true;
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("type", type);
    },
    logout(state) {
      state.username = "";
      state.token = "";
      state.userType = "";
      state.loggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("type");
    },
  },
  actions: {
    checkLoginStatus({ commit }) {
      const username = localStorage.getItem("username");
      const token = localStorage.getItem("token");
      const type = localStorage.getItem("type");
      if (username && token) {
        commit("login", { username, token, type });
      } else {
        commit("logout");
      }
    },
    async login({ commit }, { email, password }) {
      return fetch(`${API_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => {
          if (response.ok) {
            commit("clearError");
            return response.json();
          }
          return Promise.reject(response);
        })
        .then((data) => {
          commit("login", data);
          return true;
        })
        .catch((response) => {
          response.json().then((error) => {
            commit("setError", error.description);
          });
          return false;
        });
    },
    async register({ commit }, { username, email, password }) {
      return fetch(`${API_URL}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      })
        .then((response) => {
          if (response.ok) {
            commit("clearError");
            return response.json();
          }
          return Promise.reject(response);
        })
        .then((data) => {
          commit("login", data);
        })
        .catch((response) => {
          response.json().then((error) => {
            commit("setError", error.description);
          });
        });
    },
  },
};

export default userModule;
