/* eslint-disable no-unused-expressions */
/* eslint-disable require-jsdoc */
import shortid from 'shortid';
import accountDb from '../db/AccountDb';
import verifyAdmin from '../helpers/isAdmin';
import transactionDb from '../db/transactionDb';

export default class AdminFunctionality {
  static ActivatOrDeactivateAccct(req, res) {
    const { isAdmin } = req.decoded;
    try {
      if (!verifyAdmin(isAdmin)) {
        return res.status(400).json({
          status: 400,
          error: 'only an admin is allowd to perform this task'
        });
      }
    } catch (error) {
      res.status(401).json({
        error: 'pls login login as an admin'
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
          message: 'seleted account successfully deleted'
        });
      }
    }
    return res.status(404).json({
      status: 400,
      error: 'The specified account does not exist'
    });
  }

  static creaditAccount(req, res) {
    const { firstname, isAdmin, id } = req.decoded;
    const { accountNumber } = req.params;
    const createdOn = new Date();
    const { amount } = req.body;


    if (!verifyAdmin(isAdmin)) {
      return res.status(400).json({
        status: 400,
        error: 'only an admin is allowed to perform this task'
      });
    }

    const accountFound = accountDb.find(acct => acct.accountNumber === parseInt(accountNumber));
    if (!accountFound) return false;
  accountFound.openingBalance = Number(accountFound.openingBalance)
    accountFound.openingBalance +=  parseInt(amount);

    
      const result = accountFound.openingBalance;

    const data = {
      transactionId: shortid.generate(),
      createdOn,
      amount,
      cashier: firstname,
    };
    const { transactionId } = data;

    transactionDb.push(data);

    return res.status(201).json({
      status: 201,

      data: {
        transactionId,
        amount,
        accountNumber,
        cashier: id,
        // transactionType: type,
        accountBalance:result
      }
    });
  }

  static debitAccount(req, res) {
    const { isAdmin, id } = req.decoded;
    const { accountNumber } = req.params;
    const createdOn = new Date();
    const {
      amount
    } = req.body;

    if (!verifyAdmin(isAdmin)) {
      return res.status(400).json({
        status: 400,
        error: 'only an admin is allowed to perform this task'
      });
    }


    const accountFound = accountDb.find(acct => acct.accountNumber === parseInt(accountNumber));
    if (!accountFound) return false;
    if( accountFound.openingBalance <= amount){
      accountFound.openingBalance = accountFound.openingBalance;
    
    }else{
      accountFound.openingBalance -=  parseInt(amount);
    }
    
  
const result = accountFound.openingBalance;

    const data = {
      transactionId: shortid.generate(),
      accountNumber,
      amount,
      createdOn,
      cashier: id,
    };


    transactionDb.push(data);
    return res.status(201).json({
      status: 201,
      data: {
      //  transactionId,
        accountNumber,
        amount,
        cashier: id,
        accountBalance:result
      }
    });
  }
}
