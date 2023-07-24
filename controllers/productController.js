const factory = require("../utils/handleFactory");
const Product = require("../models/productModel");
const AppError = require("../utils/appError");
const path = require("path");
const imageFilter = require("../utils/imageFilter");
const ProductCategoryModel = require("../models/productCategoryModel");

// exports.createProduct = factory.createOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.findProducts = factory.find(Product);
exports.findOne = factory.findOne(Product);
exports.createProduct = factory.createOne(Product);
exports.removeProductPhoto = factory.removeFileSys("Products", "png");

exports.uploadProductPhoto = imageFilter.upload.single("image");

exports.storeProductPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `product-${Date.now()}.png`;
  const location = path.join(
    path.resolve(process.cwd()),
    "public",
    "images",
    "Products",
    req.file.filename
  );
  await imageFilter.storeImage(
    req,
    location,
    (resize = null),
    (format = "png")
  );
  req.body.image = req.file.filename.split(".")[0];

  next();
});

exports.setOldImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  const doc = await Product.findOne(req.params);
  req.doc = doc;
  next();
});

exports.setProductCategory = catchAsync(async (req, res, next) => {
  const category = await ProductCategoryModel.find({
    name: req.body.category,
  });
  const categoryId = category[0]._id;
  req.body.category = categoryId;
  req.body.categoryPath = category[0].path;
  next();
});
