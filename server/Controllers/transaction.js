/* eslint-disable require-jsdoc */

import db from '../models/index';
import find from '../queries/find';

const { findAllTransactionByaccount } = find;

export default class transaction {

  static getAllTransaction(req, res) {
    const { accountnumber } = req.params;
try{

  db.query(findAllTransactionByaccount, [accountnumber]).then((trans) => {
     return res.status(200).json({
        status:200,
        data: trans.rows
      })
  }).catch(error =>{
  return  res.status(500).json({
      status:500,
      error:error
    })
  });
}catch(error) {
  return res.status(500).json({
    status:500,
    error:'account not found'
  })
}
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
