

// eslint-disable-next-line no-undef

export const verifyAdmin = (isAdmin) => {
  const confirm = typeof isAdmin === 'boolean' ? isAdmin.toString() : isAdmin === 'true';
  return confirm;
};

export const verifyStaff = (isStaff) => {
  const confirm = typeof isStaff === 'boolean' ? isStaff.toString() : isStaff === 'true';
  return confirm;
};
