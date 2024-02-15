const validator = require("../helpers/validate");

const storeEmployee = (req, res, next) => {
  const validationRule = {
    empId: "required|string",
    position: "required|string",
    department: "required|string",
    salary: "required|numeric",
    birthdate: "required|date",
    empDate: "required|string",
    empStatus: "required|string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const storeUser = (req, res, next) => {
  const validationRule = {
    firstName: "required|string",
    lastName: "required|string",
    email: "required|email",
    password: "required|string|min:8",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  storeUser,
  storeEmployee,
};
