const passport = require("passport");

const router = require("express").Router();

router.use("/user", require("./user"));
router.use("/author", require("./author.js"));
router.use("/book", require("./book.js"));
router.use("/genre", require("./genre.js"));
router.use("/", require("./swagger.js"));

router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get("/logout", function (req, res, next) {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
