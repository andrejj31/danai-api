const express = require("express");

const jobAppController = require("../controllers/jobAppController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/job-applications").get(jobAppController.findJobApp).post(
  // authController.protect,
  jobAppController.createJobApp
);

router
  .route("/job-applications/:_id")
  .get(jobAppController.findOne)
  .patch(
    // authController.protect,
    jobAppController.updateJobApp
  )
  .delete(
    // authController.protect,
    jobAppController.deleteJobApp
  );

module.exports = router;
