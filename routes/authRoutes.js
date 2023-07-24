const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/checkUser", authController.checkUser);

module.exports = router;
