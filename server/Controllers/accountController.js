/* eslint-disable require-jsdoc */

import db from '../models/index';
import account from '../queries/insert';
import find from '../queries/find';


const { createAccount } = account;
const { findByAccountNumber } = find;

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
    if (typeof openingBalance !== 'number' || openingBalance < 0) {
      return res.status(400).json({
        status: 400,
        error: 'please enter valid number for openingBalance or openingBalance greater than zero'
      });
    }
    const currentbalance = openingBalance;
    const accountvalue = [
      type,
      openingBalance,
      currentbalance,
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

  static viewAspecificAccountDetails(req,res) {
    const { accountNumber } = req.params;

    const values = [
     accountNumber
    ];

    db.query(findByAccountNumber, values).then(accts => res.status(200).json({
      status: 200,
      data: accts.rows[0]
    })).catch((error) => {
      res.status(500).json({
        status: 500,
        error: error.message
      });
    });
  }
}
