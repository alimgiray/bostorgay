const errorModule = {
  state: () => ({
    show: false,
    message: "",
    isError: false,
  }),
  mutations: {
    setNotification(state, { message, isError = false }) {
      state.show = true;
      state.isError = isError;
      if (typeof message === "string") {
        state.message = message;
      } else {
        state.message = message.join(",");
      }
    },
    clearNotification(state) {
      state.show = false;
      setTimeout(() => {
        state.message = "";
      }, 1000);
    },
  },
  actions: {},
};

export default errorModule;
