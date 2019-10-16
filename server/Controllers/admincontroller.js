/* eslint-disable require-jsdoc */
import bcrypt from 'bcryptjs';
import { verifyStaff, verifyAdmin } from '../helpers/isAdmin';
import db from '../models/index';
import updateAccount from '../queries/update';
import Delete from '../queries/delete';
import find from '../queries/find';
import create from '../queries/insert';

const { activateOrDeactivateAcct, updateRole, updateBal } = updateAccount;

const { findByAccountNumber, findbyId, findbyemail } = find;
const { adminSignup, creditAccount } = create;
const { deleteAccount } = Delete;
export default class AdminFunctionality {
	static ActivatOrDeactivateAccct(req, res) {
		const { isAdmin, isStaff } = req.decoded;
		const { acctStatus } = req.body;
		const { accountNumber } = req.params;
		const admin = verifyAdmin(isAdmin);
		const staff = verifyStaff(isStaff);

		if (acctStatus !== 'active' && acctStatus !== 'dormant') {
			return res.status(400).json({
				status: 400,
				error: 'only active or dormant is allowed in the account status',
			});
		}

		try {
			if (admin || staff) {
				const acctValue = [acctStatus, accountNumber];
				return db.query(activateOrDeactivateAcct, acctValue).then(() =>
					res.status(200).json({
						status: 200,
						data: {
							accountNumber,
							acctStatus,
						},
					})
				);
			}
			return res.status(400).json({
				status: 400,
				error: 'only an admin or staff is allowed to perform this task',
			});
		} catch (error) {
			res.status(500).json({
				status: 500,
				error: error.message,
			});
		}
	}

	static deleteAccounts(req, res) {
		const { accountNumber } = req.params;
		const { isAdmin, isStaff } = req.decoded;
		const admin = verifyAdmin(isAdmin);
		const staff = verifyStaff(isStaff);
		try {
			if (admin || staff) {
				db.query(findByAccountNumber, [accountNumber])
					.then(accts => {
						if (accts.rows.length === 1) {
							db.query(deleteAccount, [accountNumber]);
							return res.status(200).json({
								status: 200,
								message: 'the selected account  is deleted succesfully',
							});
						}
						return res.status(404).json({
							status: 404,
							error: 'No account found',
						});
					})
					.catch(err =>
						res.status(400).json({
							status: 500,
							error: err.message,
						})
					);
			}
			// return res.status(400).json({
			//   status: 400,
			//   error: 'only an admin or staff is allowed to perform this task'
			// });
		} catch (error) {
			return res.status(400).json({
				status: 400,
				error: error.message,
			});
		}
	}

	static async creaditAccount(req, res) {
		const { isStaff, userid } = req.decoded;
		const { accountNumber } = req.params;
		const { amount } = req.body;
		const staff = verifyStaff(isStaff);
		try {
			if (typeof amount !== 'number' || amount < 1) {
				return res.status(400).json({
					status: 400,
					error: 'please enter valid number or amount greater zero',
				});
			}
			if (!verifyStaff(staff)) {
				return res.status(400).json({
					status: 401,
					error: 'only a staff can perform this operation',
				});
			}
			const acctValue = [accountNumber];

			const accountFound = await db.query(findByAccountNumber, acctValue);
			const user = accountFound.rows[0];
			try {
				if (user) {
					const balance = parseFloat(user.currentbalance) + parseFloat(amount);
					const { accountid, email } = user;
					const type = 'credit';
					const cashierid = userid;
					const transactionValues = [cashierid, amount, balance, accountNumber, accountid, email, type];

					const transaction = await db.query(creditAccount, transactionValues);
					const data = transaction.rows[0];
					const updatedBalance = await db.query(updateBal, [balance, user.accountid]);
					const { transactionid } = updatedBalance;
					return res.status(201).json({
						status: 201,
						data: {
							transactionid,
							amount,
							balance: updatedBalance.balance,
							email,
							cashierid,
							transactionType: type,
							accountBalance: user.currentbalance,
						},
						message: `your account ${accountNumber} was credited with #${amount}`,
					});
				}

				return res.status(400).json({
					status: 400,
					error: `this account ${accountNumber} number does nor exist`,
				});
			} catch (error) {
				return res.status(500).json({
					status: 500,
					error: error.message,
				});
			}
		} catch (error) {
			return res.status(500).json({
				status: 500,
				error: error.message,
			});
		}
	}

	static async debitAccount(req, res) {
		const { isStaff, userid } = req.decoded;
		const { accountNumber } = req.params;
		const { amount } = req.body;
		const staff = verifyStaff(isStaff);
		if (typeof amount !== 'number' || amount < 1) {
			return res.status(400).json({
				status: 400,
				error: 'please enter valid number or amount greater zero',
			});
		}
		if (!verifyStaff(staff)) {
			return res.status(400).json({
				status: 400,
				error: 'only a staff can perform this operation',
			});
		}
		const acctValue = [accountNumber];

		const accountFound = await db.query(findByAccountNumber, acctValue);

		const user = accountFound.rows[0];
		if (user.status === 'dormant') {
			return res.status(400).json({
				status: 400,
				error: 'this account is dormant please visit the customer care for more information',
			});
		}
		if (user) {
			if (user.currentbalance < amount) {
				return res.status(400).json({
					status: 400,
					error: 'Insufficient funds',
				});
			}
			const balance = parseFloat(user.currentbalance) - parseFloat(amount);
			const { accountid, email } = user;
			const type = 'debit';
			const cashierid = userid;
			const transactionValues = [cashierid, amount, balance, accountNumber, accountid, email, type];

			const transaction = await db.query(creditAccount, transactionValues);
			const data = transaction.rows[0];
			const updatedBalance = await db.query(updateBal, [balance, user.accountid]);
			const { transactionid } = updatedBalance;
			return res.status(201).json({
				status: 201,
				data: {
					transactionid,
					amount,
					balance: updatedBalance.balance,
					cashierid,
					transactionType: type,
					accountBalance: user.currentbalance,
				},
				message: `your account ${accountNumber} was debited with #${amount}`,
			});
		}
		return res.status(400).json({
			status: 400,
			error: `this account ${accountNumber} number does nor exist`,
		});
	}

	static createAdminAccount() {
		const adminDetails = {
			firstname: 'Olorunwa',
			lastname: 'Lawrence',
			email: process.env.EMAIL,
			username: 'OlorunwaLaw',
			isAdmin: verifyAdmin('true'),
			password: bcrypt.hashSync(process.env.PASSCODE, 10),
		};
		const { firstname, lastname, username, email, password, isAdmin } = adminDetails;
		const userValues = [firstname, lastname, username, email, password, isAdmin];
		return db
			.query(adminSignup, userValues)
			.then()
			.catch(err => console.log(err));
	}

	static adminUpdateUserRole(req, res) {
		try {
			const { isAdmin } = req.decoded;
			const { email } = req.body;
console.log('>>>>>>>>>>>>>>>>>>>>', 'this is working')
			if (!verifyAdmin(isAdmin)) {
				return res.status(400).json({
					status: 400,
					error: 'only an admin is allowd to perform this task',
				});
			}
			const staff = true;
			const values = [staff, email];
			const userValue = [email];

			db.query(findbyemail, userValue)
				.then(data => {
					const user = data.rows[0];
					if (user) {
						if (user.staff === 'false') {
							db.query(updateRole, values);
							return res.status(200).json({
								status: 200,
								data: {
									message: 'user account is successfully updated',
								},
							});
						}
						return res.status(409).json({
							status: 409,
							error: 'user is already a staff',
						});
					}
					return res.status(400).json({
						status: 400,
						error: 'This user is not a registered user',
					});
				})
				.catch(error => res.json(error.message));
		} catch (error) {
			return res.status(500).json({
				status: 500,
				error: error.message,
			});
		}
	}
}
