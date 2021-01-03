
module.exports.validateRegisterInput = (
  username,
  password,
  email,
  confirmPassword
) => {
  const errors = {};

  if (username === "") {
    errors.username = 'Please enter a username'
  }

  if (!email) {
    errors.email = 'Please enter an email'
  } else {
    const regEx = /^\S+@\S+\.\S+$/;
    if (!email.match(regEx)) {
      errors.email = 'Please enter a valid email';
    }
  } 

  if (password === "") {
      errors.password = 'Please enter a password'
  } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Confirmed passwords do not match'
  }

  if (confirmPassword === '') {
    errors.confirmPassword = 'Please confirm the password';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  if (!username) {
    errors.username = "Please enter username"
  }
  if (!password) {
    errors.username = "Please enter password"
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};
