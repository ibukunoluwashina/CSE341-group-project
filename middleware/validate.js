const validator = require("../helpers/validate");

const storeUser = (req, res, next) => {
  const validationRule = {
    email: "required|email",
    fullName: "required|string",
    birthDate: "required|date",
    address: "required|string",
    biography: "required|string",
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

const storeAuthor = (req, res, next) => {
  const validationRule = {
    userId: "required|string",
    booksPublished: "required|integer",
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

const storeGenre = (req, res, next) => {
  const validationRule = {
    name: "required|string",
    description: "required|string",
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

const storeBook = (req, res, next) => {
  const validationRule = {
    title: "required|string",
    authorId: "required|string",
    genreId: "required|date",
    publicationYear: "required|integer",
    isbn: "required|string",
    isAvailable: "required|boolean",
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
  storeAuthor,
  storeGenre,
  storeBook,
};
