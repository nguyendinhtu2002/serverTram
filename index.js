const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectDatabase = require("./config/MongoDb.js");
const UserRouter = require("./routers/User.js");

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
app.listen(process.env.PORT || 5000, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
