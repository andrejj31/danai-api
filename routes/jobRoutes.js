const express = require("express");

const jobController = require("../controllers/jobController");
// const authController = require("../controllers/authController");

const router = express.Router();

router.route("/jobs").get(jobController.findJob).post(
  // authController.protect,
  jobController.createJob
);

router
  .route("/jobs/:_id")
  .get(jobController.findOne)
  .patch(
    // authController.protect,
    jobController.updateJob
  )
  .delete(
    // authController.protect,
    jobController.deleteJob
  );

module.exports = router;
