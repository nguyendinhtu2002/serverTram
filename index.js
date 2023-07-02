const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectDatabase = require("./config/MongoDb.js");
const UserRouter = require("./routers/User.js");
const CategoryRouter = require("./routers/Category.js");
const ProductRouter = require("./routers/Product.js");
const OrderRouter = require("./routers/Order.js");
const PaymentRouter = require("./routers/Payment.js");
const VoucherRouter = require("./routers/Voucher.js");
const cron = require("node-cron");
const Voucher = require("./models/Voucher.js");

dotenv.config();
connectDatabase();

const allowedOrigins = ['http://localhost:3000', 'http://localhost:4000'];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
cron.schedule("0 0 * * *", async () => {
  try {
    const vouchers = await Voucher.find();

    for (const voucher of vouchers) {
      if (voucher.expiryDays > 0) {
        voucher.expiryDays -= 1;
        await voucher.save();
      }
      
    }

    console.log("Voucher expiryDays updated successfully");
  } catch (error) {
    console.error("Failed to update voucher expiryDays:", error);
  }
});

app.use(express.json());
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/category", CategoryRouter);
app.use("/api/v1/product", ProductRouter);
app.use("/api/v1/order", OrderRouter);
app.use("/api/v1/payment", PaymentRouter);
app.use("/api/v1/voucher", VoucherRouter);

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
