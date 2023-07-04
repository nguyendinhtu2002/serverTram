const express = require("express");
const {
  register,
  login,
  RefreshTokenController,
  updateAccount,
  updateAddress,
  getUserById,
  loginAdmin,
  getAll,
  updateAdmin,
  deleteUser,
  forgotPassword,
} = require("../controllers/UserController");
const { protect, admin } = require("../middleware/AuthMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh_token", RefreshTokenController);
router.post("/updateProfile/:id", protect, updateAccount);
router.post("/updateProfile/address/:id", protect, updateAddress);
router.get("/:_id", protect, getUserById);
router.post("/login/admin", loginAdmin);
router.get("/", protect, admin, getAll);
router.put("/updateAdmin/:id",protect,admin,updateAdmin)
router.delete("/:id",protect,admin,deleteUser)
router.post("/updatePassword",forgotPassword)
module.exports = router;
