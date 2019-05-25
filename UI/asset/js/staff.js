const amount = document.querySelector('#amount');
const btn = document.querySelector('.btn');
const url = 'http://localhost:9000/api/v1/transactions/754680408/credit';
const error = document.querySelector('.error');


const creditAccount = (e) => {
  e.preventDefault();
  if (amount.value === '') {
    error.textContent = 'Amount cannot be empty';
    setTimeout(() => {
      error.textContent = null;
    }, 3000);
    return false;
  }
//   const value = 


  const data = {
    amount:Number(amount.value)
  };

  axios(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-access-token': `${localStorage.getItem('token')}`
    },
    data: data
  }).then((res) => {
    console.log(res);
  }).catch((err) => {
    console.log(err.response);
  });
};
btn.addEventListener('click', creditAccount);
