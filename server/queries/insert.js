const query = {
    userSignup: 'INSERT INTO users (firstname,lastname, username, email, password) VALUES ($1, $2, $3, $4,$5) returning *',
    createAccount:'INSERT INTO accounts (type,openingBalance,firstname,lastname, username, email,accountNumber,status,userId) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *'
  };
  export default query;