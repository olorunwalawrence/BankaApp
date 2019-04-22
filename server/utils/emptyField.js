const fieldValidator = (type, args) => {
  const expectedInputs = [];
  const empty = [];
  const response = {};
  if (type == 'signup') {
    for (const input in args) {
      expectedInputs.push(input);
      if (args[input].trim() === '') {
        empty.push(input);
        response.status = 400;
        response.error = `${empty} field/s cannot be empty`;
      }
    }
    if (expectedInputs.length < 5) {
      response.status = 400;
      response.error = 'firstname, lastname, email, password, username are required';
    }
    return response;
  }


  if (type == 'login') {
    for (const input in args) {
      expectedInputs.push(input);
      if (args[input].trim() === '') {
        empty.push(input);
        response.status = 400;
        response.error = `${empty} field/s cannot be empty`;
      }
    }
    if (expectedInputs.length < 2) {
      response.status = 400;
      response.error = 'email, password are required';
    }
    return response;
  }
  if (type == 'account') {
    for (const input in args) {
      expectedInputs.push(input);
      if (args[input].trim() === '') {
        empty.push(input);
        response.status = 400;
        response.error = `${empty} field/s cannot be empty`;
      }
    }
    if (expectedInputs.length < 2) {
      response.status = 400;
      response.error = 'openingBalance, type are required';
    }
    return response;
  }
  if (type == 'staff') {
    for (const input in args) {
      expectedInputs.push(input);
      if (args[input].trim() === '') {
        empty.push(input);
        response.status = 400;
        response.error = `${empty} field/s cannot be empty`;
      }
    }
    if (expectedInputs.length < 5) {
      response.status = 400;
      response.error = 'firstname, lastname, email, password, username,isStaff are required';
    }
    return response;
  }
};

export default fieldValidator;
