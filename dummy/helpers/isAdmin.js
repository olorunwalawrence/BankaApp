

// eslint-disable-next-line no-undef

const veryfyAdmin = (isAdmin ) => {
  const confirm = isAdmin.trim().toLowerCase() !== 'yes' ? false : true;
  return confirm;
};
     
export default veryfyAdmin;
