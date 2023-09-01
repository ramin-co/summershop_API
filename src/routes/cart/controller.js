const Cart = require("../../models/cart");

module.exports = new (class {
  async addCart(req, res) {
    const newCart = new Cart({
      ...req.body,
    });
    try {
      const createdCart = await newCart.save();
      res.status(200).json(createdCart);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async updateCart(req, res) {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return res.status(200).json(updatedCart);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async delete(req, res) {
    try {
      await Cart.findOneAndDelete(req.params.id);
      res.status(200).json("user has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getCart(req, res) {
    try {
      console.log(req.params.userId)
      const result = await Cart.findOne({ userId:req.params.userId });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getAllCart(req, res) {
    try {
      const result =await Cart.find();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
})();
