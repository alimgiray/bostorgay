let options = {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

const time = {
  format: (t) => {
    const date = new Date(t);
    return date.toLocaleTimeString("tr-tr", options);
  },
};

export default time;
