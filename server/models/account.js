import index from './index';

const accountTable = () => {
    const accountTable = `
          CREATE TABLE IF NOT EXISTS accounts (
          accountid SERIAL PRIMARY KEY,
          type VARCHAR(255) NOT NULL,
          openingBalance VARCHAR(255) NOT NULL,
          firstname VARCHAR(255) NOT NULL,
          lastname VARCHAR(255) NOT NULL,
          username VARCHAR(255) NOT NULL,
          email TEXT NOT NULL UNIQUE,
          accountNumber VARCHAR(255) NOT NULL,
          status VARCHAR(255) NOT NULL,
          userid INTEGER REFERENCES users(userid)
          
          
          )`;   
    return index.query(accountTable);
  };
  export default accountTable;