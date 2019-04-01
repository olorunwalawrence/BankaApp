/* eslint-disable require-jsdoc */
/* eslint-disable func-names */
const display = document.querySelector('.views');
const close = document.querySelector('.close');
const Delete = document.querySelector('.delete');

/**
 ===========================================
 OPEN EDIT MODAL
 ===========================================
 */

const displayAccount = () => {
  document.querySelector('#accounts').style.display = 'flex';
};

display.addEventListener('click', displayAccount);

const closeAccount = () => {
  document.querySelector('#accounts').style.display = 'none';
};
close.addEventListener('click', closeAccount);
const deleteAccount = () => {
  document.querySelector('#accounts').style.display = 'none';
};
Delete.addEventListener('click', deleteAccount);

function myFunction() {
    let x = document.getElementById('status');
    if (x.innerHTML === 'Active') {
      x.innerHTML = 'Domant';
    } else {
      x.innerHTML = 'Active';
    }
  }
