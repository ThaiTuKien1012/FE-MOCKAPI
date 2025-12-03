const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) && email.endsWith('@fptu.edu.vn');
};

const validatePassword = (password) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
};

const validatePhone = (phone) => {
  const re = /^0\d{9}$/;
  return re.test(phone);
};

const validateVietnamesePhone = (phone) => validatePhone(phone);

module.exports = {
  validateEmail,
  validatePassword,
  validatePhone,
  validateVietnamesePhone
};

