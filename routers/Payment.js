const express = require("express");
const { createPayment, getAll, updatePayment, deletePayment } = require("../controllers/PaymentController");
const { protect } = require("../middleware/AuthMiddleware");
const router = express.Router();


router.post("/",protect,createPayment)
router.get("/",getAll)
router.put("/update/:paymentId",protect,updatePayment)
router.delete("/delete/:paymentId",protect,deletePayment)
module.exports = router