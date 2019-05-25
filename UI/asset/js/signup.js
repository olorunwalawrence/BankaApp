/* eslint-env browser */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */

const body = document.querySelector('body');

const myFunction = () => {
  const x = document.getElementById('myTopnav');
  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
};


const btn = document.querySelector('.btn');
const error = document.querySelector('.error');
const firstname = document.getElementById('fname');
const lastname = document.getElementById('lname');
const username = document.getElementById('uname');
const email = document.getElementById('email');
const password = document.getElementById('pword');



function fetchLogin(e) {
  e.preventDefault()
  if (firstname.value.trim() === '' || lastname.value.trim === '' || username.value.trim === '' || email.value.trim === '' || password.value.trim === '') {
    error.textContent = 'empty field detected pls check and fill them';
    setTimeout(() => {
      error.textContent = null;
    }, 5000);
    return false;
  }

  body.style.cursor = 'progress';
  const data = {
    firstname: firstname.value,
    lastname: lastname.value,
    email: email.value,
    username: username.value,
    password: password.value  
  
  };

  const url = 'http://localhost:9000/api/v1/auth/signup';
  axios(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    data
  })
    .then((response) => {
      body.style.cursor = 'default';


      localStorage.setItem('token', `${response.data.data.token}`);
      window.location = 'userdashboard.html';
    })
    .catch((err) => {
      error.textContent = err.response.data.error;

      body.style.cursor = 'default';
      setTimeout(() => {
        error.textContent = null;
      }, 5000);
    });
}

btn.addEventListener('click', fetchLogin);
