const express = require("express");

const brandController = require("../controllers/brandController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/brands").get(brandController.findBrand).post(
  // authController.protect,
  brandController.createBrand
);

router
  .route("/brands/:_id")
  .get(brandController.findOne)
  .patch(
    // authController.protect,
    brandController.updateBrand
  )
  .delete(
    // authController.protect,
    brandController.deleteBrand
  );

module.exports = router;
