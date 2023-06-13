const express = require("express");
const { createVoucher, getVoucher, deleteVoucher, updateVoucher } = require("../controllers/VoucherController");
const { protect, admin } = require("../middleware/AuthMiddleware");

const router = express.Router()


router.post("/create",protect,createVoucher)
router.get("/",protect,admin,getVoucher)
router.delete("/:id",protect,admin,deleteVoucher)
router.put("/:id",protect,admin,updateVoucher)
module.exports = router;
