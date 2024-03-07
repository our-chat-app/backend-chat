const { check, validationResult } = require('express-validator');



const validateMessage = [
  check('message')
    .not()
    .isEmpty()
    .withMessage('can not be empty')
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

module.exports = {
  validateMessage,
};
