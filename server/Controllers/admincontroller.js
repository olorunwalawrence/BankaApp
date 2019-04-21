/* eslint-disable require-jsdoc */
import verifyAdmin from '../helpers/isAdmin';
import db from '../models/index';
import updateAccount from '../queries/update';
import deleteAccounts from '../queries/delete';
import findAccount from '../queries/find';

const { activateOrDeactivateAcct } = updateAccount;
const { deleteAccount } = deleteAccounts;
const { findByAccountNumber } = findAccount;


export default class AdminFunctionality {
  static ActivatOrDeactivateAccct(req, res) {
    const { isAdmin } = req.decoded;
    const { acctStatus } = req.body;
    const { accountNumber } = req.params;

    if (acctStatus !== 'active' && acctStatus !== 'dormant') {
      return res.status(400).json({
        status: 400,
        error: 'only active or dormant is allowed in the account status'
      });
    }

    try {
      if (!verifyAdmin(isAdmin)) {
        return res.status(400).json({
          status: 400,
          error: 'only an admin is allowd to perform this task'
        });
      }

      const acctValue = [
        acctStatus,
        accountNumber
      ];

      db.query(activateOrDeactivateAcct, acctValue).then(() => res.status(200).json({
        status: 200,
        data: {
          accountNumber,
          acctStatus
        }
      }));
    } catch (error) {
      res.status(401).json({
        status: 401,
        error
      });
    }
  }

  static deleteAccount(req, res) {
    let accountFound;
    const { accountNumber } = req.params;
    db.query(findByAccountNumber, [accountNumber]).then((acctNum) => {
      accountFound = acctNum.rows[0].accountnumber;
    }).catch(error => res.status(500).json({
      status: 500,
      error: error.message
    }));

    if ([accountFound].length < 1) {
      return res.status(400).json({
        status: 400,
        error: 'the specified account does not exist'
      });
    }
    db.query(deleteAccount, [accountNumber]).then((del) => {
      res.status(200).json({
        status: 200,
        message: 'the selected account  is deleted succesfully',
        data:del
      });
    }).catch(err => res.status(500).json({
      status: 500,
      error: err.message
    }));
  }
}
