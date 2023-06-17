const express = require("express");
const { createOrder, getAllOrders, updateOrders, getDetailsOrders, deleteOrders } = require("../controllers/OrderController");
const router = express.Router();
const { protect } = require("../middleware/AuthMiddleware");


router.post("/create",protect,createOrder)
router.get("/",getAllOrders)
router.put("/update/:id",protect,updateOrders)
router.get("/details/:id",protect,getDetailsOrders)
router.delete("/delete/:orderId",deleteOrders)
module.exports = router