

// eslint-disable-next-line no-undef

const veryfyAdmin = (isAdmin) => {
  const confirm = isAdmin.trim().toLowerCase() === 'yes';
  return confirm;
};

export const veryfyStaff = (isStaff) => {
  const confirm = isStaff.trim().toLowerCase() === 'yes';
  return confirm;
};

export const checkType = (type) => {
  const param = type.trim().toLowerCase();
  if (param !== 'client' || param !== 'staff') return true;
};

export default veryfyAdmin;

