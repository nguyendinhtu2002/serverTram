const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectDatabase = require("./config/MongoDb.js");
const UserRouter = require("./routers/User.js");
const CategoryRouter = require("./routers/Category.js");
const ProductRouter = require("./routers/Product.js");

dotenv.config();
connectDatabase();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/category", CategoryRouter);
app.use("/api/v1/product", ProductRouter);

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
