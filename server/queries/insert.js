const query = {
  userSignup: 'INSERT INTO users (firstname,lastname, username, email, password, isAdmin,staff) VALUES ($1, $2, $3, $4,$5,$6, $7) returning *',
  createAccount: 'INSERT INTO accounts (type, address, phoneNumber,bvnNumber,openingBalance, currentbalance, firstname,lastname, username, email,accountNumber,status,userId) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11,$12,$13) returning *',
  createTransaction: 'INSERT INTO transactions (firstname,lastname, username, email, password, isStaff) VALUES ($1, $2, $3, $4,$5,$6) returning *',
  adminSignup: 'INSERT INTO users (firstname,lastname, username, email, password, isAdmin) VALUES ($1, $2, $3, $4,$5,$6) returning *',
  creditAccount: 'INSERT INTO transactions (cashierid, amount, balance, accountnumber, accountid,email, type) VALUES ($1, $2, $3, $4, $5, $6,$7) returning *'
};
export default query;
