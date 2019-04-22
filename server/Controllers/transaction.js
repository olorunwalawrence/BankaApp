/* eslint-disable require-jsdoc */

import db from '../models/index';
import accountHistories from '../queries/find';

const { accountHistory } = accountHistories;

export default class transaction {
  static viewHistory(req, res) {
    const { accountNumber } = req.params;

    const values = [
      accountNumber
    ];
    // db.query(accountHistory, values).then((acct) => {
    //   console.log(acct.rows[0].accountnumber);
    // }).catch((err) => {
    //   res.status(500).json({
    //     status: 500,
    //     error: err.message
    //   });
    // });
    db.query(accountHistory, values).then(transactions => res.status(200).json({
      status: 200,
      data: transactions.rows
    })).catch((error) => {
      res.status(500).json({
        status: 500,
        error: error.message
      });
    });
  }

  static viewAtransaction(req,res) {
    const { transactionid } = req.params;

    const values = [
      transactionid
    ];

    db.query(accountHistory, values).then(transactions => res.status(200).json({
      status: 200,
      data: transactions.rows[0]
    })).catch((error) => {
      res.status(500).json({
        status: 500,
        error: error.message
      });
    });
  }
}
