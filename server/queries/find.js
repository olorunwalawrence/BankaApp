const find = {
  getalluser: 'SELECT * FROM users ',
  findbyemail: 'SELECT * FROM users WHERE email = $1 LIMIT 1;',
  findbyId: 'SELECT * FROM users WHERE userid = $1 LIMIT 1;',
  findByUsername: 'SELECT * FROM users WHERE username = $1 LIMIT 1;',
  findByAccountNumber: 'SELECT * FROM accounts WHERE accountnumber = $1 LIMIT 1;',
  findAllTransactionByaccount: 'SELECT * FROM transactions WHERE accountnumber = $1 LIMIT 100 '
};

export default find;
