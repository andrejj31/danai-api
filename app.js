const express = require("express");

const app = express();

const cors = require("cors");

const cookieParser = require("cookie-parser");

const globalErrorHandler = require("./controllers/errorController");

const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://danaifarm.com.mk",
      "http://danaifarm.com.mk",
    ],

    credentials: true,

    exposedHeaders: "Content-Range",
  })
);

app.use(express.static("public"));

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const productRoutes = require("./routes/productRoutes");

const productCategoryRoutes = require("./routes/productCategoryRoutes");

const jobRoutes = require("./routes/jobRoutes");

const jobAppRoutes = require("./routes/jobAppRoutes");

const authRoutes = require("./routes/authRoutes");

const brandRoutes = require("./routes/brandRoutes");

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
  });
});
app.use(productRoutes);

app.use(productCategoryRoutes);

app.use(jobRoutes);

app.use(jobAppRoutes);

app.use(brandRoutes);

app.use(authRoutes);

app.use((req, res, next) => {
  req.lang = req.query.lang;

  next();
});

app.use(globalErrorHandler);

module.exports = app;
