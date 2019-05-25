/* eslint-env browser */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */

const body = document.querySelector('body');

const btn = document.querySelector('.btn');
const error = document.querySelector('.error');
const type = document.getElementById('type');
const address = document.getElementById('address');
const phone = document.getElementById('phone');
const bvn = document.getElementById('bvn');

function fetchAccount(e) {
  e.preventDefault();
  if (
    type.value.trim() === ''
    || address.value.trim === ''
    || phone.value.trim === ''
    || bvn.value.trim === ''
  ) {
    error.textContent = 'empty field detected pls check and fill them';
    setTimeout(() => {
      error.textContent = null;
    }, 5000);
    return false;
  }

  body.style.cursor = 'progress';
  const data = {
    type: type.value,
    address: address.value,
    bvnNumber: bvn.value,
    phoneNumber: phone.value
  };

  const url = 'http://localhost:9000/api/v1/accounts';
  fetch(url, {
    method: 'POST',
    'Access-Control-Allow-Origin': '*',
    headers: {
      'content-type': 'application/json',
      'x-access-token': `${localStorage.getItem('token')}`
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then((response) => {
      error.textContent = response.error;
      setTimeout(() => {
        error.textContent = null;
      }, 5000);
      body.style.cursor = 'default';
      // window.location = 'userdashboard.html';
    })
    .catch((err) => {
      body.style.cursor = 'default';
      setTimeout(() => {
        error.textContent = null;
      }, 5000);
    });
}

btn.addEventListener('click', fetchAccount);
