const query = {
  userSignup: 'INSERT INTO users (firstname,lastname, username, email, password, isAdmin) VALUES ($1, $2, $3, $4,$5,$6) returning *',
  createAccount: 'INSERT INTO accounts (type, openingBalance, currentbalance, firstname,lastname, username, email,accountNumber,status,userId) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *',
  createTransaction: 'INSERT INTO transactions (firstname,lastname, username, email, password, isStaff) VALUES ($1, $2, $3, $4,$5,$6) returning *',
  adminSignup: 'INSERT INTO users (firstname,lastname, username, email, password, isAdmin) VALUES ($1, $2, $3, $4,$5,$6) returning *',
  creditAccount: 'INSERT INTO transactions (cashierid, amount, balance, accountnumber, accountid, type) VALUES ($1, $2, $3, $4, $5, $6) returning *'
};
export default query;
