/* eslint-disable require-jsdoc */
import bcrypt from 'bcrypt';
import verifyAdmin from '../helpers/isAdmin';
import { verifyStaff } from '../helpers/isAdmin';
import db from '../models/index';
import updateAccount from '../queries/update';
import deleteAccounts from '../queries/delete';
import findAccount from '../queries/find';
import createAdmin from '../queries/insert';

const { activateOrDeactivateAcct } = updateAccount;
const { deleteAccount } = deleteAccounts;
const { findByAccountNumber, findByAccountNumbers } = findAccount;
const { adminSignup } = createAdmin;

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
      res.status(500).json({
        status: 500,
        error: error.message
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
        data: del
      });
    }).catch(err => res.status(500).json({
      status: 500,
      error: err.message
    }));
  }

  static staffAccount(req, res) {

  }

  static creaditAccount(req, res) {
    const {} = req.decoded;
    const { accountNumber } = req.params;
    const createdOn = new Date();
    const { amount } = req.body;
    let accountValues = {};


    const acctValue = [
      accountNumber
    ];

    db.query(findByAccountNumber, acctValue).then((accountFound) => {
      accountValues = accountFound.rows[0];
    });


    // const transactionValues = [
    //   staffid,
    //   amount,
    //   accountnumber,
    //   balance,
    //   accountid
    // ]

    // const accountFound = db.query().then(() =>{

    // })
    //   acct => acct.accountNumber === parseInt(accountNumber));
    //   if (!accountFound) return false;
    // accountFound.openingBalance = Number(accountFound.openingBalance)
    //   accountFound.openingBalance +=  parseInt(amount);


    // const result = accountFound.openingBalance;

    // const data = {
    //   transactionId: shortid.generate(),
    //   createdOn,
    //   amount,
    //   cashier: firstname,
    // };
    // const { transactionId } = data;

    // transactionDb.push(data);

    // return res.status(201).json({
    //   status: 201,

    //   data: {
    //     transactionId,
    //     amount,
    //     accountNumber,
    //     cashier: id,
    //     // transactionType: type,
    //     accountBalance:result
    //   }
    // });
  }

  static createAdminAccount(req, res) {
    const adminDetails = {
      firstname: 'Olorunwa',
      lastname: 'Lawrence',
      email: process.env.EMAIL,
      username: 'OlorunwaLaw',
      isAdmin: verifyAdmin('yes'),
      password: bcrypt.hashSync(process.env.PASSCODE, 10)
    };
    const {
      firstname, lastname, username, email, password, isAdmin
    } = adminDetails;
    const userValues = [firstname, lastname, username, email, password, isAdmin];
    return db.query(adminSignup, userValues).then().catch(err => console.log(err));
  }
}
