const find = {
  getalluser: 'SELECT * FROM users ',
  findbyemail: 'SELECT * FROM users WHERE email = $1 LIMIT 1;',
  findByUsername: 'SELECT * FROM users WHERE username = $1 LIMIT 1;',
  findByAccountNumber: 'SELECT * FROM accounts WHERE accountNumber = $1 LIMIT 1;',
  accountHistory: 'SELECT * FROM transactions WHERE accountNumber =$1',
  viewSpecificTransactio: 'SELECT * FROM transactions WHERE transactionid =$1 ',
};

export default find;
