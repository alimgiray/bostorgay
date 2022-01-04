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
      setTimeout(() => {
        state.errorMessage = "";
      }, 1000);
    },
  },
  actions: {},
};

export default errorModule;
