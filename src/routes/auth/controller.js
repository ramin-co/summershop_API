const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = new (class {
  async register(req, res) {
    console.log(req.body)
    const salt = await bcrypt.genSalt(10);
    const newUser = new User({
      img:req.body.img,
      name:req.body.name,
      lastname:req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, salt),
      phone:req.body.phone,
      address:req.body.address
    });
    try {
      const user = await newUser.save();
      const { password, ...others } = user._doc;
      res.status(200).json({
        message:'added user',
        data:others
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async login(req, res) {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(401).json("wrong credintial");
      }
      const result = await bcrypt.compare(req.body.password, user.password);
      if (!result) {
        return res.status(401).json("wrong crenditial");
      }
      const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin },process.env.JWT_SEC,{expiresIn:'3d'});
      const { password, ...others } = user._doc;
      res.status(200).json({...others, token});
    } catch (error) {
      res.status(500).json(error);
    }
  }
})();
