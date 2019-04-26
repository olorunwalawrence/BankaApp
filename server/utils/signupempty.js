const signupUndefined = (param1, param2, param3, param4, param5, res) => {
  if (!param1 || !param2 || !param3 || !param4 || param5) {
    return res.status(400).json({
      status: 400,
      error: 'one of the required field is not provided'
    });
  }
};
export default signupUndefined;
