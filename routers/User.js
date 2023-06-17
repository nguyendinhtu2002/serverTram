const express = require("express");
const {
  register,
  login,
  RefreshTokenController,
  updateAccount,
  updateAddress,
  getUserById,
} = require("../controllers/UserController");
const { protect } = require("../middleware/AuthMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh_token", RefreshTokenController);
router.post("/updateProfile/:id", updateAccount);
router.post("/updateProfile/address/:id", protect, updateAddress);
router.get("/:_id", protect, getUserById);

module.exports = router;
