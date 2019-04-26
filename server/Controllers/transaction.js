/* eslint-disable require-jsdoc */

import db from '../models/index';
import find from '../queries/find';

const { findAllTransactionByaccount, findAspecificTransaction, findAccountByacctIdAndEmail } = find;

export default class transaction {
  static getAllTransaction(req, res) {
    const { accountnumber } = req.params;
    const { email } = req.decoded;
    const customerMail = email;

    try {
      db.query(findAllTransactionByaccount, [accountnumber]).then((trans) => {
        if (trans.rows.length < 1) {
          return res.status(404).json({
            status: 404,
            error: `this ${accountnumber} number number does not exist`
          });
        }

        if (customerMail === trans.rows[0].email) {
          return res.status(200).json({
            status: 200,
            data: trans.rows
          });
        }
        return res.status(400).json({
          status: 400,
          error: 'pls kindly login to your account to view all your transactions'
        });
      }).catch(error => res.status(500).json({
        status: 500,
        error
      }));
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'account not found'
      });
    }
  }

  static viewAtransaction(req, res) {
    const { transactionid } = req.params;
    const { email } = req.decoded;
    const values = [
      transactionid
    ];

    db.query(findAspecificTransaction, values).then((transactions) => {
      const acctemail = transactions.rows[0].email;

      if (email === acctemail) {
        return res.status(200).json({
          status: 200,
          data: transactions.rows
        });
      }
      return res.status(400).json({
        status: 400,
        error: 'pls kindly login to your account to view all your transactions'
      });
    }).catch((error) => {
      res.status(500).json({
        status: 500,
        error: 'the specified account id does not exist'
      });
    });
  }
}
