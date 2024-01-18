const getUserFromLocalStorage = () => {
  const userFromLocalStorage = localStorage.getItem("user");
  return userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null;
};

export { getUserFromLocalStorage };
