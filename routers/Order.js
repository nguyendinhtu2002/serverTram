const express = require("express");
const { createOrder, getAllOrders, updateOrders, getDetailsOrders, deleteOrders } = require("../controllers/OrderController");
const router = express.Router();
const { protect, admin } = require("../middleware/AuthMiddleware");


router.post("/create",protect,createOrder)
router.get("/",protect,admin,getAllOrders)
router.put("/update/:id",protect,admin,updateOrders)
router.get("/details/:id",protect,admin,getDetailsOrders)
router.delete("/delete/:orderId",deleteOrders)
module.exports = router