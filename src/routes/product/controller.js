const Product = require("../../models/product");

module.exports = new (class {
  
  async addProduct(req, res) {
    try {
      const newProduct = new Product({
        img: req.body.img,
        title: req.body.title,
        desc: req.body.desc,
        catogeries: req.body.catogeries,
        color: req.body.color,
        size: req.body.size,
        price: req.body.price,
        stock: req.body.stock,
        
      });
      const createdPro = await newProduct.save();
      res.status(200).json(createdPro);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  async updateProduct(req, res) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async delete(req, res) {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("user has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getProduct(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getAllPrpduct(req, res) {
    try {
      const qnew = req.query.new;
      const qcatogery = req.query.catogery;
      let products = [];
      if (qnew) {
        products = await User.find().sort({ createdAt: -1 }).limit(5);
      } else if (qcatogery) {
        products = await Product.find({
          catogeries: {
            $in: [qcatogery],
          },
        });
      } else {
        products = await Product.find();
      }
      console.log(products);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async state(req, res) {}
})();
