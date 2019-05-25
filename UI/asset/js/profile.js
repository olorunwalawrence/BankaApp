const viewTransaction = document.querySelector('.transaction-container');
const display = document.querySelector('.viewprofile');
const email = localStorage.getItem('email');
const viewAtrans = document.querySelector('.viewAtrasaction');

          /* ================================================
                VIEW ACCOUNT PROFILE FUNCTION
          ================================================== */
const viewAccount = () => {
  const viewUserAccount = `http://localhost:9000/api/v1/user/${email}/accounts`;

  fetch(viewUserAccount, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'x-access-token': `${localStorage.getItem('token')}`
    }
  }).then(res => res.json())
    .then((res) => {
      localStorage.setItem('accountnumber', res.data[0].accountnumber);

      const data = `
      <div class="profile">firstname</div>
      <div class="profile">${res.data[0].firstname}</div>
      <div class="profile">lastname</div>
      <div class="profile">${res.data[0].lastname}</div>
      <div class="profile">email</div>
      <div class="profile">${res.data[0].email}</div>
      <div class="profile">Address</div>
      <div class="profile">${res.data[0].address}</div>
      <div class="profile">BVN</div>
      <div class="profile">${res.data[0].bvnnumber}</div>
      <div class="profile">Current balance</div>
      <div class="profile">${res.data[0].currentbalance}</div>
      <div class="profile">Opening balance</div>
      <div class="profile">${res.data[0].openingbalance}</div>
      <div class="profile">account Number</div>
      <div class="profile">${res.data[0].accountnumber}</div>
      <div class="profile">status</div>
      <div class="profile">${res.data[0].status}</div>
      <div class="profile">Phone Number</div>
      <div class="profile">${res.data[0].phonenumber}</div>
      <div class="profile">type</div>
      <div class="profile" data ='${JSON.stringify(res.accountnumber)}'>${res.data[0].type}</div>
      
      `;
      display.innerHTML = data;
    }).catch((err) => {

    });
};
viewAccount();


                    /* ================================================
                      VIEW ALL TRANSACTIONS FUNCTION
                    ================================================== */

const viewTransactions = () => {
  const acct = localStorage.getItem('accountnumber');
  const url = `http://localhost:9000/api/v1/accounts/${acct}/transactions`;

  fetch(url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'x-access-token': `${localStorage.getItem('token')}`
    }
  })
    .then(res => res.json())
    .then((res) => {
      let transaction = '';

      res.data.map((resp) => {
        transaction += `
              <table>
              <tr>
                  <th>transaction type</th>
                  <th>Account Number</th>
                  <th>Account Balance</th>
                  <th>Amount</th>
                  <th>view</th>  
              </tr>
      
              <tr>
              <td>${resp.type}</td>
              <td>${resp.accountnumber}</td>
              <td>${resp.balance}</td>
              <td>${resp.amount}</td>
              <td><a onClick ="viewAtransaction(this,${resp.transactionid}), openModal()" data ='${JSON.stringify(resp)}'  >view</a></td>
          </tr>
           </table>
      `;
      });

      viewTransaction.innerHTML = transaction;
    });
};

viewTransactions();


              /* ================================================
                      VIEW A SPECIFIC TRANSACTIONS FUNCTION
              ================================================== */

const viewAtransaction = (self, transactionid) => {
  const viewTrans = `http://localhost:9000/api/v1/transactions/${transactionid}`;

  fetch(viewTrans, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'x-access-token': `${localStorage.getItem('token')}`
    }
  })
    .then(res => res.json())
    .then((res) => {
      let transaction = '';

      res.data.map((resp) => {
        transaction += `
              <div class = "myModal">
              <span class="close" id = "close"  onClick ="closes()">&times;</span>
              <table>
              <tr>
                  <th>transaction type</th>
                  <th>Account Number</th>
                  <th>Account Balance</th>
                  <th>Amount</th>
   
              </tr>
      
              <tr>
              <td>${resp.type}</td>
              <td>${resp.accountnumber}</td>
              <td>${resp.balance}</td>
              <td>${resp.amount}</td>
            
          </tr>
           </table>
                

              </div>
      `;
      });

      viewAtrans.innerHTML = transaction;
    });
};

const openModal = () => {
  document.querySelector('.viewAtrasaction').style.display = "block"
}

const closes = () =>{
  document.querySelector('.myModal').style.display = "none";
}
