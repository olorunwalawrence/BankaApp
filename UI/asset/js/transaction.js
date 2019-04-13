
  /* eslint-disable require-jsdoc */
/* eslint-disable func-names */
const display = document.querySelector('.views');
const responsive_display = document.querySelector('.viewss');
const close = document.querySelector('.close');


/**
 ===========================================
 OPEN EDIT MODAL
 ===========================================
 */

const displayAccount = () => {
  document.querySelector('#accounts').style.display = 'flex';
};

display.addEventListener('click', displayAccount);

const resDisplayAccount = () => {
  document.querySelector('.view-transactions').style.display = 'block';
};

responsive_display.addEventListener('click', resDisplayAccount)


const closeAccount = () => {
  document.querySelector('#accounts').style.display = 'none';
};
close.addEventListener('click', closeAccount);
const deleteAccount = () => {
  document.querySelector('#accounts').style.display = 'none';
};

const myFunction = () => {
    let x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
