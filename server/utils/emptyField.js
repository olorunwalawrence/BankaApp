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
      response.error = 'some of the required field/s are not provided please check and provide them';
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
      response.error = 'email or password field is required';
    }
    return response;
  }
  if (type == 'account') {
    const expectedInput = ['type', 'address', 'phoneNumber','bvnNumber'];
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
        response.error = `${empty} is not account creation request`
      }
    }
    if (inputFieldCount.length < 4) {
      response.status = 400;
      response.error = 'type, address, phoneNumber,bvnNumberis required';
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

   if (type == 'transaction') {
    const expectedInput = ['amount'];
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
        response.error = `${empty} is not transaction creation required field/s`
      }
    }
    if (inputFieldCount.length < 1) {
      response.status = 400;
      response.error = 'amount is required';
    }
    return response;
  }
};

export default fieldValidator;
