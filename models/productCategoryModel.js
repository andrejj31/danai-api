const mongoose = require("mongoose");

const productCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  path: { type: String, require: true },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
    },
  ],
  translate: {
    en: {
      name: { type: String, required: true },
    },
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  dateModified: {
    type: Date,
    default: Date.now(),
  },
});

const ProductCategory = mongoose.model(
  "ProductCategory",
  productCategorySchema
);

module.exports = ProductCategory;
