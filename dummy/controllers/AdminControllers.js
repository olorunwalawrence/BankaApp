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
        error: 'only an admin is alloewd to perform this task'
      });
    }

    let updatedStatus = {};
  
    
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
        error: 'only an admin is allowd to perform this task'
      });
    }

    for (let i = 0; i < accountDb.length; i += 1) {
      if (accountDb[i].accountNumber === Number(accountNumber)) {
        accountDb.splice(i, 1);
        return res.status(200).json({
          status: 200,
          error: 'seleted account successfully deleted'
        });
      }
    }
    return res.status(404).json({ 
      status: 400,
      error: 'The specified account does not exist'
    });
  }

  static creaditAccount(req, res) {
    const { firstname, isAdmin } = req.decoded;
    const { accountNumber } = req.params;
    let newBalance = {};
    const createdOn = new Date();
    const { type, amount } = req.body;


    if (!verifyAdmin(isAdmin)) {
      return res.status(400).json({
        status: 400,
        error: 'only an admin is allowed to perform this task'
      });
    }

    transactionDb.forEach((acct) => {
        const balance = Number(acct.oldBalance) + Number(amount);
        newBalance = balance;
      });

    

    const data = {
      createdOn,
      type,
      amount,
      cashier: firstname,
      newBalance
    };
    transactionDb.push(data);

    return res.status(201).json({
      status: 201,
      error: `your account ${accountNumber} has been credited with ${amount} on ${createdOn}`,
      data: {
        type,
        amount,
        newBalance
      }
    });
  }

  static debitAccount(req, res) {
    const { firstname, isAdmin } = req.decoded;
    const { accountNumber } = req.params;
    let newBalance = '';
    const createdOn = new Date();
    const {
      type, amount
    } = req.body;

    if (!verifyAdmin(isAdmin)) {
      return res.status(400).json({
        status: 400,
        error: 'only an admin is allowed to perform this task'
      });
    }

    transactionDb.forEach((acct) => {
      const balance = Number(acct.oldBalance) - Number(amount);
      newBalance = balance;
    });


    const data = {
      createdOn,
      type,
      amount,
      cashier: firstname,
      newBalance
    };
    transactionDb.push(data);
    return res.status(201).json({
      status: 201,
      error: `your account ${accountNumber} has been debited with ${amount} on ${createdOn}`,
      data: {
        accountNumber,
        amount,
        cashier: firstname,
        transactionType: type,
        newBalance
      }
    });
  }
}
