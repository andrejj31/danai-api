const factory = require("../utils/handleFactory");
const JobApp = require("../models/jobAppModel");

exports.deleteJobApp = factory.deleteOne(JobApp);
exports.updateJobApp = factory.updateOne(JobApp);
exports.findOne = factory.findOne(JobApp);
exports.findJobApp = factory.find(JobApp);
exports.createJobApp = factory.createOne(JobApp);
