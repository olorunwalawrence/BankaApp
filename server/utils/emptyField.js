/* eslint-disable */
const fieldValidator = (type, args) => {
  const inputFieldCount = [];
  const empty = [];
  const response = {};
  if (type == 'signup') {
    const expectedInput = ['firstname', 'lastname', 'email', 'password', 'username'];
    for (const input in args) {
      inputFieldCount.push(input);
      if (typeof inputField === 'string') {
        if (args[input].trim() === '') {
          empty.push(input);
          response.status = 400;
          response.error = `${empty} field/s cannot be empty`;
        }
      }
      if (!expectedInput.includes(input)) {
          empty.push(input);
        response.status = 400;
        response.error = `${empty} are not expected in signup`
      }
    }
    if (inputFieldCount.length < expectedInput.length) {
      response.status = 400;
      response.error = 'firstname, lastname, email, password, username are required';
    }
    return response;
  }


  if (type == 'login') {
    const expectedInput = ['email', 'password'];
    for (const input in args) {
      inputFieldCount.push(input);
      if (typeof inputField === 'string') {
        if (args[input].trim() === '') {
          empty.push(input);
          response.status = 400;
          response.error = `${empty} field/s cannot be empty`;
        }
      }
      if (!expectedInput.includes(input)) {
        empty.push(input);
        response.status = 400;
        response.error = `${empty} are not expected in login`
      }
    }
    if (inputFieldCount.length < expectedInput.length) {
      response.status = 400;
      response.error = 'email, password are required';
    }
    return response;
  }
  if (type == 'account') {
    const expectedInput = ['openingBalance', 'type'];
    for (const input in args) {
      inputFieldCount.push(input);
      const inputField = args[input];
      if (typeof inputField === 'string') {
        if (args[input].trim() === '') {
          empty.push(input);
          response.status = 400;
          response.error = `${empty} field/s cannot be empty`;
        }
      }
      if (!expectedInput.includes(input)) {
        empty.push(input);
        response.status = 400;
        response.error = `${empty} are not account creation request`
      }
    }
    if (inputFieldCount.length < 2) {
      response.status = 400;
      response.error = 'openingBalance, type are required';
    }
    return response;
  }
  if (type == 'staff') {
    for (const input in args) {
      inputFieldCount.push(input);
      if (typeof inputField === 'string') {
        if (args[input].trim() === '') {
          empty.push(input);
          response.status = 400;
          response.error = `${empty} field/s cannot be empty`;
        }
      }
    }
    if (inputFieldCount.length < 5) {
      response.status = 400;
      response.error = 'firstname, lastname, email, password, username,isStaff are required';
    }
    return response;
  }
};

export default fieldValidator;
