/* eslint-env browser */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
const body = document.querySelector('body');
const btn = document.querySelector('.btn');
const error = document.querySelector('.error');
const email = document.getElementById('email');
const password = document.getElementById('pword');

function fetchLogin(e) {
  e.preventDefault();

  if (email.value.trim() === '' || password.value.trim() === '') {
    error.textContent = 'Please Enter Your Email And Password';
    setTimeout(() => {
      error.textContent = null;
    }, 3000);
    return false;
  }

  localStorage.setItem('email', email.value);
  body.style.cursor = 'progress';
  const data = {
    email: email.value,
    password: password.value
  };
  const url = 'http://localhost:9000/api/v1/auth/login';
  fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then((response) => {
      body.style.cursor = 'default';

      if (response.data.isAdmin === true) {
        localStorage.setItem('token', `${response.data.token}`);
        location = 'staff-account.html';
      } else if (response.data.isStaff === true) {
        localStorage.setItem('token', `${response.data.token}`);
        window.location = 'staff.html';
      } else {
        localStorage.setItem('token', `${response.data.token}`);
        window.location = 'userdashboard.html';
      }
    })
    .catch((err) => {

      error.style.color = 'red';
      // error.textContent = err.response.error;
      body.style.cursor = 'default';
      setTimeout(() => {
        error.textContent = null;
      }, 3000);
    });
}

btn.addEventListener('click', fetchLogin);
