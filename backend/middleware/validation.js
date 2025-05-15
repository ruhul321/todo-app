const { body, validationResult } = require('express-validator');

// Check for validation result
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Auth validation
exports.registerValidation = [
  body('email').isEmail().withMessage('Email is invalid'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  validate
];

exports.loginValidation = [
  body('email').isEmail().withMessage('Email is invalid'),
  body('password').notEmpty().withMessage('Password is required'),
  validate
];

// Todo list
exports.todoListValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  validate
];

// Todo item
exports.todoItemValidation = [
  body('text').notEmpty().withMessage('Text is required'),
  validate
];

exports.todoItemUpdateValidation = [
  body('text').optional().isString().withMessage('Text must be a string'),
  body('completed').optional().isBoolean().withMessage('Completed must be a boolean'),
  validate
];
