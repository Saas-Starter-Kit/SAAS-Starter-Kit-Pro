const silentAuth = (login, logout) => {
  let user = JSON.parse(localStorage.getItem('user'));
  let expiresAt = JSON.parse(localStorage.getItem('expiresIn'));

  if (user && new Date().getTime() < expiresAt) {
    login();
  } else if (!user && new Date().getTime() < expiresAt) {
    logout();
  }
};

export default silentAuth;
