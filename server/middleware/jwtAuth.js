/* eslint-disable indent */
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

// eslint-disable-next-line no-undef
const secret = process.env.SECRET;

const verifyUser = (req, res, next) => {
	const token = req.headers['x-access-token'];
	if (!token) {
		return res.status(401).json({
			status: 401,
			error: 'authentication failed, please provide a token'
		});
	}

	try {
		const decoded = jwt.verify(token, secret);
		if (!decoded) {
			return res.status(401).json({
			error: 'authentication failed'
			});
		}
		req.decoded = decoded;
		next();
	} catch (error) {
		res.status(401).json({
			status:401,
			error: 'invalid token provided'
		});
	}
};

export default verifyUser;