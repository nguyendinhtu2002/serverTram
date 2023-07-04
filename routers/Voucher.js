const express = require("express");
const { createVoucher, getVoucher, deleteVoucher, updateVoucher, getByCode } = require("../controllers/VoucherController");
const { protect, admin } = require("../middleware/AuthMiddleware");
const { getAll } = require("../controllers/PaymentController");

const router = express.Router();


router.post("/create",protect,createVoucher)
router.get("/",getVoucher)
router.delete("/:id",protect,admin,deleteVoucher)
router.put("/:id",protect,admin,updateVoucher)
router.post("/details/code",getByCode)

module.exports = router;
