const sharp = require("sharp");
const multer = require("multer");

// Multer MemoryStorage Settings
const multerStorage = multer.memoryStorage();

// multerFilter Settings - Proveruva dali vneseniot fajl e slika
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Вашиот фајл не е слика !", 400), false);
  }
};

exports.upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.storeImage = (req, location, resz, format = "jpg") => {
  if (resz) {
    const resize = resz.split(",");
    const width = parseInt(resize[0]);
    const height = parseInt(resize[1]);
    sharp(req.file.buffer)
      .png({ quality: 90 })
      .resize(width, height)
      .toFormat(format)
      .toFile(location);
  } else {
    sharp(req.file.buffer)
      .resize(800, 800, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .png({ quality: 90 })
      .toFormat(format)
      .toFile(location);
  }
};
