
const logout = document.querySelector('#logout');


const user = {

  logoutUser() {
    window.localStorage.removeItem('token');
    window.location.replace('index.html');
  }
};


// logout.addEventListener('click', user.logoutUser);

