// Import Express validator package
const { validationResult } = require('express-validator');

// Handles validation errors
const handleValidationErrors = (req, _res, next) => {
  // Adds any validation errors to variable
  const validationErrors = validationResult(req);

  // Formats any erros
  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach(error => errors[error.param] = error.msg);

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }

  next();
}

module.exports = {
  handleValidationErrors
};
