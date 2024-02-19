const { check, validationResult } = require('express-validator');

const validateCreateUser = [
  check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Invalid email address!')
    .not()
    .isEmpty()
    .withMessage('Empty  email address!'),
  check('nickname')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Name can not be empty!')
    .isLength({ min: 2 })
    .withMessage('Minimum 2 characters required!'),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('You need a password!')
    .isLength({ min: 3 })
    .withMessage('Minimum 2 characters required!'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

module.exports = {
  //validateLoginUser,
  validateCreateUser,
};
