const mongoose = require("mongoose");
const Job = require("./jobModel");
const AppError = require("../utils/appError");

const jobAppSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  mail: { type: String, required: true },
  number: { type: String, required: true },
  CV: { type: String, required: true },
  applicationFor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
    autopopulate: { select: "name -applications" },
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

jobAppSchema.plugin(require("mongoose-autopopulate"));

jobAppSchema.post("save", async function (doc, next) {
  const foundJob = await Job.findById(doc.applicationFor);

  if (!foundJob) {
    return next(new AppError("Оваа работна позиција не е пронајдена", 404));
  }

  foundJob.applications.push(doc._id);
  await foundJob.save();
  next();
});

const JobApp = mongoose.model("JobApp", jobAppSchema);

module.exports = JobApp;
