const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const CORS = require("cors");
const { connectDB } = require("./config/db");
const http = require('http');

app.use(express.json());
app.use(cookieParser());
connectDB();


app.use(CORS());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Access"
  );
  res.setHeader("Access-Control-Expose-Headers", "X-Access");
  next();
});
app.use(express.urlencoded({ limit: "50mb", extended: true }));


const authenticationRoutes = require("./routes/authenticationRoute");
app.use("/api/auth", authenticationRoutes);

const productRoutes = require("./routes/productRoute");
app.use("/api/product", productRoutes);

const customerRoutes = require("./routes/customerRoute");
app.use("/api/customer", customerRoutes);

const adminRoutes = require("./routes/adminRoute");
app.use("/api/admin", CORS(), adminRoutes);







const PORT = process.env.PORT || 5000;
http.createServer(app).listen(PORT, () => {
  console.log(`Server Started On Port ${PORT}`);
});
