const errorModule = {
  state: () => ({
    show: false,
    message: "",
  }),
  mutations: {
    setError(state, message) {
      state.showError = true;
      if (typeof message === "string") {
        state.errorMessage = message;
      } else {
        state.errorMessage = message.join(",");
      }
    },
    clearError(state) {
      state.showError = false;
      state.errorMessage = "";
    },
  },
  actions: {},
};

export default errorModule;
