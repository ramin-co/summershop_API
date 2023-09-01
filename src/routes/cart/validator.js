const { check, validationResult } = require("express-validator");

module.exports = new (class {
  addUseer(req, res) {
    return [
      check("name").not().isEmpty().withMessage("name cant be Empty"),
      check("email").isEmail().withMessage("email cant be empty"),
      check("password").isEmail().withMessage("password cant be empty"),
    ];
  }
})();
