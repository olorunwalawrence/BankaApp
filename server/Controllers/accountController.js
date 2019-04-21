/* eslint-disable require-jsdoc */

import db from '../models/index';
import account from '../queries/insert';
// import accountNumbers from '../queries/find';


const { createAccount } = account;

export default class Account {
  static createAccount(req, res) {
    const {
      firstname, email, lastname, username, userid
    } = req.decoded;

    const accountNumber = Math.floor(Math.random() * 10000000000);
    const date = new Date();
    const status = 'active';



    const {
      type, openingBalance
    } = req.body;

    const accountvalue = [
      type,
      openingBalance,
      firstname,
      lastname,
      username,
      email,
      accountNumber,
      status,
      userid
    ];


    db.query(createAccount, accountvalue).then(newAcct => res.status(201).json({
      status: 201,
      data: {
        accountNumber,
        createdOn: date,
        owner: userid,
        type: status,
        balance: openingBalance
      }
    })).catch((error) => {
      res.status(500).json({
        status: 500,
        error
      });
    });

  }
}
