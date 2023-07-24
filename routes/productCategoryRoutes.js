const express = require("express");

const productCategoryController = require("../controllers/productCategoryController");
// const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/product-categories")
  .get(productCategoryController.findProductCategories)
  .post(
    // authController.protect,
    productCategoryController.createProductCategory
  );

// router
//   .route("/products/:id")
//   .get(productController.findOne)
//   .patch(
//     // authController.protect,
//     productController.uploadProductPhoto,
//     productController.storeProductPhoto,
//     productController.setOldImage,
//     productController.removeProductPhoto,
//     productController.updateProduct
//   )
//   .delete(
//     // authController.protect,
//     productController.deleteProduct,
//     productController.removeProductPhoto
//   );

module.exports = router;
