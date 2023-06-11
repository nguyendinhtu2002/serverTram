const express = require("express");
const { createVoucher, getVoucher, deleteVoucher, updateVoucher } = require("../controllers/VoucherController");

const router = express.Router()


router.post("/create",createVoucher)
router.get("/",getVoucher)
router.delete("/:id",deleteVoucher)
router.put("/:id",updateVoucher)
module.exports = router;
