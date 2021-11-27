const moveHome = () => {
  window.history.pushState("signin", "", "/");
  window.history.go(0);
};

export const delay = (time) => {
  setTimeout(() => {}, time);
};

export default moveHome;
