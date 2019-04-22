import db from '../index';

export default {
  dropUserTable() {
    const userModel = `
    DROP TABLE IF EXISTS users CASCADE;`;
    return db.query(userModel);
  },
  dropAccountTable() {
    const accountModel = 'DROP TABLE IF EXISTS accounts CASCADE;';
    return db.query(accountModel);
  },
  droptransactionTable() {
    const transactionModel = 'DROP TABLE IF EXISTS transactions CASCADE;';
    return db.query(transactionModel);
  },
};
