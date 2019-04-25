/* eslint-disable require-jsdoc */

import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.SECRET;

// eslint-disable-next-line no-undef

export const verifyAdmin = (isAdmin) => {
  const confirm = typeof isAdmin === 'boolean' ? isAdmin : isAdmin === 'true';
  return confirm;
};

export const verifyStaff = (isStaff) => {
  const confirm = typeof isStaff === 'boolean' ? isStaff : isStaff === 'true';
  return confirm;
};


