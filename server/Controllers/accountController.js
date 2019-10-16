/* eslint-disable require-jsdoc */

import { constants } from 'zlib';
import db from '../models/index';
import account from '../queries/insert';
import find from '../queries/find';
import { verifyStaff, verifyAdmin } from '../helpers/isAdmin';

const { createAccount } = account;
const { findAccountByemail, findByAccountNumber, getallAccounts, findAccountByStatus } = find;

export default class Account {
	static createAccount(req, res) {
		const { firstname, email, lastname, username, userid } = req.decoded;

		const accountNumber = Math.floor(Math.random() * 10000000000);
		const date = new Date();
		const status = 'active';
		const num = 0;
		const openbal = num.toFixed(2);
		const openingBalance = parseFloat(openbal);
		const { type, address, phoneNumber, bvnNumber } = req.body;
		if (type !== 'savings' && type !== 'current') {
			return res.status(400).json({
				status: 400,
				error: 'only savings and current is allowed is the account type',
			});
		}

		const currentbalance = openingBalance;
		const accountvalue = [
			type,
			address,
			phoneNumber,
			bvnNumber,
			openingBalance,
			currentbalance,
			firstname,
			lastname,
			username,
			email,
			accountNumber,
			status,
			userid,
		];
		db.query(createAccount, accountvalue)
			.then(newAcct =>
				res.status(201).json({
					status: 201,
					data: {
						accountNumber,
						createdOn: date,
						owner: userid,
						status,
						type,
						balance: openingBalance,
					},
				})
			)
			.catch(error => {
				res.status(400).json({
					status: 400,
					error: `account with ${error.detail}`,
				});
			});
	}

	static viewAspecificAccountDetails(req, res) {
		const { accountNumber } = req.params;

		const values = [accountNumber];

		db.query(findByAccountNumber, values)
			.then(accts => {
				if (accts.rows.length < 1) {
					return res.status(404).json({
						status: 404,
						error: `this account number ${accountNumber} is incorrect and connot be found`,
					});
				}
				return res.status(200).json({
					status: 200,
					data: accts.rows,
				});
			})
			.catch(error => {
				res.status(500).json({
					status: 500,
					error: error.message,
				});
			});
	}

	static userViewASpecificAccount(req, res) {
		const userEmail = req.decoded.email;
		const { email } = req.params;

		const values = [email];
		try {
			db.query(findAccountByemail, values)
				.then(accts => {
					if (accts.rows.length < 1) {
						return res.status(404).json({
							status: 404,
							error: `this email (${email}) is not associated with any account`,
						});
					}
					if (email === userEmail) {
						return res.status(200).json({
							status: 200,
							data: accts.rows,
						});
					}
					return res.status(400).json({
						status: 400,
						error: 'pls kindly login to your account to view all your details',
					});
				})
				.catch(error => {
					return res.status(500).json({
						status: 500,
						error: error.message,
					});
				});
		} catch (error) {
			return res.status(500).json({
				status: 500,
				error: 'account not found',
			});
		}
	}

	static adminStaffViewAllAccount(req, res) {
		const { isAdmin, isStaff } = req.decoded;
		const admin = verifyAdmin(isAdmin);
		const staff = verifyStaff(isStaff);

		if (admin || staff) {
			return db
				.query(getallAccounts)
				.then(accts => {
					if (accts.rows.length < 1) {
						return res.status(404).json({
							status: 404,
							error: 'No account found',
						});
					}
					return res.status(200).json({
						status: 200,
						data: accts.rows,
					});
				})
				.catch(error => {
					res.status(500).json({
						status: 500,
						error: error.message,
					});
				});
		}
	}

	static adminStaffViewAccountByStatus(req, res) {
		const { isAdmin, isStaff } = req.decoded;
		const admin = verifyAdmin(isAdmin);
		const staff = verifyStaff(isStaff);
		const { status } = req.query;
		const value = [status];

		if (admin || staff) {
			return db
				.query(findAccountByStatus, value)
				.then(accts => {
					if (accts.rows.length < 1) {
						return res.status(404).json({
							status: 404,
							error: 'No such account account found',
						});
					}
					return res.status(200).json({
						status: 200,
						data: accts.rows,
					});
				})
				.catch(error =>
					res.status(500).json({
						status: 500,
						error: error.message,
					})
				);
		}
		return res.status(400).json({
			status: 400,
			error: 'only an admin  or staff is allowd to perform this task',
		});
	}
}
