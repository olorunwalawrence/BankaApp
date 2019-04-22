import index from './index';


const transactionTables = () => {
  const transactionTable = `
        CREATE TABLE IF NOT EXISTS transactions (
        transactionid SERIAL PRIMARY KEY,
        type VARCHAR(255) NOT NULL,
        oldBalance VARCHAR(255) NOT NULL,
        amount VARCHAR(255) NOT NULL,
        accountnumber VARCHAR(255) NOT NULL,
        balance VARCHAR(255) NOT NULL,
        cashierid INTEGER REFERENCES users(userid)
        )`;
  return index.query(transactionTable);
};

export default transactionTables;
