const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  catalogNumber: { type: Number, required: true },
  barCode: { type: Number, required: true },
  quantity: { type: String, required: true },
  transportPackages: { type: String, required: true },
  image: { type: String, required: true },
  landingPage: { type: Boolean, enum: [true, false], default: false },
  categoryPath: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductCategory",
    required: true,
  },
  translation: {
    en: {
      name: { type: String, required: true },
      description: { type: String, required: true },
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

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
  });

  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
