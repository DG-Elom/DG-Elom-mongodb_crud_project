const Product = require("../models/products");
const fs = require("fs");

exports.getAllProducts = (req, res) => {
  Product.find()
    .exec()
    .then((products) => {
      return res.send(products);
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: err.message });
      return res.sendStatus(500);
    });
};

exports.insertProduct = (req, res) => {
  console.log(req.body.owner);
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
    owner: req.body.owner,
    image: req.file.filename,
  });
  product
    .save()
    .then(() => {
      req.session.message = {
        type: "success",
        message: "Product added successfully!",
      };
      res.redirect("/products");
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: err.message, type: "danger" });
    });
};

exports.editProductPage = (req, res) => {
  let id = req.params.id;
  Product.findById({ _id: id })
    .then((product) => {
      if (product == null) {
        res.redirect("/products");
      } else {
        return res.send(product);
      }
    })
    .catch((err) => {
      res.redirect("/products");
    });
};

exports.updateProduct = (req, res) => {
  let id = req.params.id;
  let new_image = "";

  if (req.file) {
    new_image = req.file.filename;
    try {
      fs.unlinkSync("./client/assets/img/" + req.body.old_image);
    } catch (err) {
      console.log(err);
    }
  } else {
    new_image = req.body.old_image;
  }

  Product.findByIdAndUpdate(id, {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
    owner: req.body.owner,
    image: new_image,
  })
    .then((obj) => {
      req.session.message = {
        type: "success",
        message: "Product updated successfully!",
      };
      return res.send(obj);
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: err.message, type: "danger" });
    });
};

exports.deleteProduct = (req, res) => {
  let id = req.params.id;
  Product.findByIdAndRemove(id)
    .then((result) => {
      if (result.image != "") {
        try {
          fs.unlinkSync("./client/assets/img/" + result.image);
        } catch (err) {
          console.log(err);
        }
      }
      req.session.message = {
        type: "info",
        message: "Product deleted successfully!",
      };
      return res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: err.message, type: "danger" });
    });
};
