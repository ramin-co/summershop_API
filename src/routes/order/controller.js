const Order = require("../../models/order");

module.exports = new (class {
  async addOrder(req, res) {
    const newOrder = new Order(req.body);
    try {
      const oredr = await newOrder.save();
      res.status(200).json(oredr);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async updateOrder(req, res) {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async delete(req, res) {
    try {
      await Order.findOneAndDelete(req.params.id);
      res.status(200).json("user has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getOrder(req, res) {
    try {
      const order = await Order.find({ userId: req.params.userId });
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getAllOrder(req, res) {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async earningStats(req, res) {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 6));
    // const preiosMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    try {
      let income = await Order.aggregate([
        { $match: { createdAt: { $gte: lastMonth } } },
        { $project: { month: { $month: "$createdAt" }, sales: "$amount" } },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      income.sort((a, b) => a._id - b._id);
      res.status(200).json(income);
    } catch (error) {
      console.log(error);
    }
  }

  async stats(req, res) {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 2));
    try {
      let income = await Order.aggregate([
        { $match: { createdAt: { $gte: lastMonth } } },
        { $project: { month: { $month: "$createdAt" } } },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      income.sort((a, b) => a._id - b._id);
      res.status(200).json(income);
    } catch (error) {
      console.log(error);
    }
  }
  async daylyRevenue(req, res) {
    const DATE = new Date();
    const lastDay = new Date(DATE.setDate(DATE.getDate() - 2));
    try {
      let income = await Order.aggregate([
        { $match: { createdAt: { $gte: lastDay } } },
        { $project: { day: { $dayOfMonth: "$createdAt" }, sales: "$amount" } },
        {
          $group: {
            _id: "$day",
            total: { $sum: "$sales" },
          },
        },
      ]);
      income.sort((a, b) => a._id - b._id);
      res.status(200).json(income);
    } catch (error) {
      console.log(error);
    }
  }
})();
