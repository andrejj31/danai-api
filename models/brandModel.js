const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
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

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
