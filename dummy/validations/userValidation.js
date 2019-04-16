const userFieldRequiredValidation = (firstname, lastname, email, type, password, isAdmin, res) => {
  if (!firstname || !lastname || !email || !type || !password || !isAdmin) {
    return res.status(400).send({
      success: 'false',
      message: 'field required'
    });
  }
};
export const loginFieldRequiredValidation = ( email, password ,res) => {
  if ( !email || !password ) {
    return res.status(400).send({
      success: 'false',
      message: 'field required' 
    });
  }
};

export default userFieldRequiredValidation;
