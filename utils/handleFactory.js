const catchAsync = require("./catchAsync");
const AppError = require("./appError");
const path = require("path");
const fs = require("fs");
const DataFilter = require("../utils/DataFilter");
const Product = require("../models/productModel");
const ProductService = require("./services/ProductService");

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    if (!doc) {
      return next(new AppError("Внесете ги сите барани полиња!"));
    }
    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findOneAndDelete(req.params);
    if (!doc) {
      return next(
        new AppError("Не може да се пронајде бараниот документот!", 404)
      );
    }

    if (doc.image) {
      req.doc = doc;
    }

    // if (!doc.image) {
    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
    // }

    // next();
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findOneAndUpdate(
      req.params,
      { ...req.body, dateModified: Date.now() },
      {
        new: true,
      }
    );

    if (!doc) {
      return next(
        new AppError("Не може да се пронајде бараниот документот!", 404)
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.find = (Model) =>
  catchAsync(async (req, res, next) => {
    const search = new DataFilter(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .lang()
      .category()
      .paginate();

    const search_2 = new DataFilter(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .lang()
      .category();

    let doc = await search.query;
    let doc_2 = await search_2.query;

    // if (req.query.category) {
    //   doc = ProductService.findByCategory(req, doc);
    //   doc_2 = ProductService.findByCategory(req, doc_2);
    // }

    let totalCount = doc_2.length;
    if (!doc) {
      return next(
        new AppError("Не постојат инстанци од бараните документи!", 404)
      );
    }

    res.status(200).json({
      status: "success",
      totalCount,
      data: doc,
    });
  });

exports.findOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findOne(req.params);
    if (!doc) {
      return next(
        new AppError("Не може да се пронајде бараниот документот!", 404)
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.removeFileSys = (folderName, fileType = "jpg") =>
  catchAsync(async (req, res, next) => {
    if (req.doc) {
      const image = `${req.doc.image}.${fileType}`;

      const filePath = path.resolve(
        process.cwd(),
        "public",
        "images",
        folderName,
        image
      );

      await fs.unlink(filePath, (err, del) => {});
      next();
    } else {
      next();
    }
  });
