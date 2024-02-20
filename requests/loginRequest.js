const { object, string, bool } = require('yup');

const loginSchema = object().shape({
  email: string().email().required(),
  password: string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[^\w\s]/, 'Password must contain at least one special character'),
  remember: bool(),
});

module.exports = loginSchema;
