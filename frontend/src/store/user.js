const API_URL = import.meta.env.VITE_API_URL || "/";

const userModule = {
  state: () => ({
    loggedIn: false,
    username: "",
    token: "",
    userType: "",
    users: [],
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
    setUsers(state, users) {
      state.users = users;
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
      fetch(`${API_URL}/api/users/login`, {
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
        })
        .catch((response) => {
          response.json().then((error) => {
            commit("setError", error.description);
          });
        });
    },
    async register({ commit }, { username, email, password }) {
      fetch(`${API_URL}/api/users/register`, {
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
    async getUsers({ commit, getters }) {
      fetch(`${API_URL}/api/users`, {
        headers: getters.requestHeader,
      })
        .then((response) => {
          if (response.ok) {
            commit("clearError");
            return response.json();
          }
          return Promise.reject(response);
        })
        .then((data) => {
          commit("setUsers", data);
        })
        .catch((response) => {
          response.json().then((error) => {
            commit("setError", error.description);
          });
        });
    },
    async getUser({ commit }, username) {
      return fetch(`${API_URL}/api/users/${username}`)
        .then((response) => {
          if (response.ok) {
            commit("clearError");
            return response.json();
          } else {
            return Promise.reject(response);
          }
        })
        .catch((response) => {
          response.json().then((error) => {
            commit("setError", error.description);
          });
        });
    },
    async updateUser({ commit, getters }, { id, type }) {
      return fetch(`${API_URL}/api/users/${id}`, {
        method: "PUT",
        headers: getters.requestHeader,
        body: JSON.stringify({ type }),
      })
        .then((response) => {
          if (response.ok) {
            commit("clearError");
            return response.json();
          } else {
            return Promise.reject(response);
          }
        })
        .catch((response) => {
          response.json().then((error) => {
            commit("setError", error.description);
          });
        });
    },
  },
  getters: {
    requestHeader(state) {
      return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.token}`,
      };
    },
  },
};

export default userModule;
