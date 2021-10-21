const moveHome = () => {
  window.history.pushState("signin", "", "/");
  window.history.go(0);
};

export default moveHome;
