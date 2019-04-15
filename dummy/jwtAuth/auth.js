/* eslint-disable indent */
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

// eslint-disable-next-line no-undef
const secret = process.env.SECRET;

const verifyUser = (req, res, next) => {
	const token = req.headers['x-access-token'];
	if (!token) {
		res.status(301).json({
			success: false,
			message: 'authentication failed, please login'
		});
	}

	try {
		const decoded = jwt.verify(token, secret);
		if (!decoded) {
			res.status(401).json({
				message: 'authentication failed'
			});
		}
		req.decoded = decoded;
		next();
	} catch (error) {
		res.status(400).json({
			message: 'invalid token, you are not a valid user'
		});
	}
};

export default verifyUser;