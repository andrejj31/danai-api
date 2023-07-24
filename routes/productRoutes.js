const express = require("express");

const productController = require("../controllers/productController");
// const authController = require("../controllers/authController");

const router = express.Router();

router.route("/products").get(productController.findProducts).post(
  // authController.protect,
  productController.uploadProductPhoto,
  productController.setProductCategory,
  productController.storeProductPhoto,
  productController.createProduct
);

router
  .route("/products/:_id")
  .get(productController.findOne)
  .patch(
    // authController.protect,
    productController.uploadProductPhoto,
    productController.setProductCategory,
    productController.storeProductPhoto,
    productController.setOldImage,
    productController.removeProductPhoto,
    productController.updateProduct
  )
  .delete(
    // authController.protect,
    productController.deleteProduct,
    productController.removeProductPhoto
  );

module.exports = router;
