/* eslint-disable no-unused-expressions */
/* eslint-disable require-jsdoc */
import accountDb from '../db/AccountDb';
import verifyAdmin from '../helpers/isAdmin';
import transactionDb from '../db/transactionDb';

export default class AdminFunctionality {
  static ActivatOrDeactivateAccct(req, res) {
    const { isAdmin } = req.decoded;

    if (!verifyAdmin(isAdmin)) {
      return res.status(400).json({
        status: 400,
        message: 'only an admin is alloewd to perform this task'
      });
    }

    let updatedStatus = {};
    // let status = req.body.acctStatus;
    
    const { accountNumber } = req.params;
    accountDb.forEach((acct) => {
      if (acct.accountNumber === Number(accountNumber)) {
        acct.status = req.body.acctStatus || acct.status;
      }
      updatedStatus = acct;
    });
    if (updatedStatus) {
      return res.status(200).json({
        status: 200,
        data: {
          accountNumber,
           status: updatedStatus.status
        }
      });
    }
  }

   /**
   * ()
   * @desc deletes a account
   * @param {*} req
   * @param {*} res
   * @returns {object} deletedmeal
   */
  static deleteAccount(req, res) {
    const { isAdmin } = req.decoded;
    const { accountNumber } = req.params;

    if (!verifyAdmin(isAdmin)) {
      return res.status(400).json({
        status: 400,
        message: 'only an admin is alloewd to perform this task'
      });
    }

    for (let i = 0; i < accountDb.length; i += 1) {
      if (accountDb[i].accountNumber === Number(accountNumber)) {
        accountDb.splice(i, 1);
        return res.status(200).json({
          status: 200,
          message: 'seleted account successfully deleted'
        });
      }
    }
    return res.status(404).json({ message: '404, account not found' });
  }

}
