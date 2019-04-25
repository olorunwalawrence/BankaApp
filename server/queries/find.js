const find = {
  getalluser: 'SELECT * FROM users ',
  getallAccounts: 'SELECT * FROM accounts ',
  findbyemail: 'SELECT * FROM users WHERE email = $1 LIMIT 1;',
  findAccountByemail: 'SELECT * FROM accounts WHERE email = $1 LIMIT 1;',
  findbyId: 'SELECT * FROM users WHERE userid = $1 LIMIT 1;',
  findByUsername: 'SELECT * FROM users WHERE username = $1 LIMIT 1;',
  findByAccountNumber: 'SELECT * FROM accounts WHERE accountnumber = $1 LIMIT 1;',
  findAllTransactionByaccount: 'SELECT * FROM transactions WHERE accountnumber = $1 LIMIT 100 ',
  findAspecificTransaction: 'SELECT * FROM transactions WHERE transactionid = $1 LIMIT 100 ',
  findAccountByStatus: 'SELECT * FROM accounts WHERE status = $1 LIMIT 1;',
};

export default find;
