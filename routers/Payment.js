const express = require("express");
const { createPayment, getAll, updatePayment, deletePayment } = require("../controllers/PaymentController");
const router = express.Router();


router.post("/",createPayment)
router.get("/",getAll)
router.put("/update/:paymentId",updatePayment)
router.delete("/delete/:paymentId",deletePayment)
module.exports = router