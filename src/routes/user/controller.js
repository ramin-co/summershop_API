const user = require("../../models/user");
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = new (class {
  async update(req, res) {
    if (req.body.password) {
      const salt = bcrypt.genSalt(10);
      req.body.password = bcrypt.hash(req.body.password, salt);
    }
    try {
      const userUpdate = await user.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      const { password, ...others } = userUpdate._doc;
      return res.status(200).json(others);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async delete(req, res) {
    const id = req.params.id;
    console.log(id);
    try {
      console.log("enter");
       const result=await User.findByIdAndDelete(id);
       console.log(result);
      res.status(200).json("user has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getUser(req, res) {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getAllUsers(req, res) {
    try {
      const query = req.query.new;

      let users = query
        ? await User.find().sort({ _id: -1 }).limit(1)
        : await User.find();
      res.status(200).send(users);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async stats(req, res) {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 2));
    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastMonth } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);

      console.log(data,':data')
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
})();
