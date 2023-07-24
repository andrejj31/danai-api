const factory = require("../utils/handleFactory");
const ProductCategory = require("../models/productCategoryModel");

exports.deleteProductCategory = factory.deleteOne(ProductCategory);
exports.updateProductCategory = factory.updateOne(ProductCategory);
exports.findProductCategories = factory.find(ProductCategory);
exports.findOne = factory.findOne(ProductCategory);
exports.createProductCategory = factory.createOne(ProductCategory);
