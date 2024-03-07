const { check, validationResult } = require('express-validator');
const { escape } = require('mysql2');

const validateLoginUser = [
  check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Invalid email address!')
    .not()
    .isEmpty()
    .withMessage('Empty  email address!')
    .escape(),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('You need a password!')
    .isLength({ min: 3 })
    .withMessage('Minimum 2 characters required!')
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

module.exports = {
  validateLoginUser,
};
