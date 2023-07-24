const mongoose = require("mongoose");
// const JobApp = require("./jobAppModel");

const jobSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  qualifications: [String],
  status: { type: String, enum: ["отворен", "затворен"], required: true },
  translation: {
    en: {
      name: { type: String, required: true },
      description: { type: String, required: true },
      qualifications: [String],
    },
  },
  applications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobApp",
      autopopulate: { select: "-applicationFor" },
    },
  ],
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  dateModified: {
    type: Date,
    default: Date.now(),
  },
});

jobSchema.plugin(require("mongoose-autopopulate"));

// jobSchema.post("findOneAndDelete", async function (doc, next) {
//   const ids = [];
//   doc.applications.forEach((el) => {
//     ids.push(el._id.toString());
//   });

//   console.log(ids);
//   const records = await JobApp.remove({ _id: { $in: ids } });
//   console.log(records);
// });

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
