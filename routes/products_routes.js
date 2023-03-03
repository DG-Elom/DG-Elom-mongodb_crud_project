const express = require("express");
const router = express.Router();
const multer = require("multer");
const controller = require("../controllers/products_ctrl");

// image upload
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./client/assets/img");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});
var upload = multer({
  storage: storage,
}).single("image");

// Get all products
router.get("/", controller.getAllProducts);

// Insert an product in database
router.post("/add", upload, controller.insertProduct);

// Get Edit product page
router.get("/edit/:id", controller.editProductPage);

// Update product
router.put("/update/:id", upload, controller.updateProduct);

// Delete product
router.delete("/delete/:id", controller.deleteProduct);

module.exports = router;
