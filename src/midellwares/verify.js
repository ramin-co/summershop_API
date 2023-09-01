const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) return res.status(400).json("token is not valid");
      req.user = user;
      next();
    });
  } else {
    res.status(400).json("your not login");
  }
};

const verifyTokenAndCheackId = (req, res, next) => {
  verify(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) return next();
    return res.status(403).json("you are not allowed to do that");
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verify(req, res, () => {
    if (req.user.isAdmin) return next();
    return res.status(403).json("you are not allowed to do that");
  });
};

module.exports = { verify, verifyTokenAndCheackId, verifyTokenAndAdmin };
