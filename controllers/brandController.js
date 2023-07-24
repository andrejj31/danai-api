const factory = require("../utils/handleFactory");
const Brand = require("../models/brandModel");

exports.deleteBrand = factory.deleteOne(Brand);
exports.updateBrand = factory.updateOne(Brand);
exports.findOne = factory.findOne(Brand);
exports.findBrand = factory.find(Brand);
exports.createBrand = factory.createOne(Brand);
