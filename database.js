const mongoose = require("mongoose");
const dotenv = require("dotenv");

const DB = process.env.DATABASE.replace(
  "PASSWORD",
  process.env.DATABASE_PASSWORD
);
