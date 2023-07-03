const express = require("express");
const {
  createPayment,
  getAll,
  updatePayment,
  deletePayment,
  getDetailPayment,
} = require("../controllers/PaymentController");
const { protect, admin } = require("../middleware/AuthMiddleware");
const router = express.Router();

router.post("/", protect, createPayment);
router.get("/", protect, admin, getAll);
router.put("/update/:paymentId", protect, admin, updatePayment);
router.delete("/delete/:paymentId", protect, admin, deletePayment);
router.get("/detail/:id",protect,admin,getDetailPayment)
module.exports = router;
