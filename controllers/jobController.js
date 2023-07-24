const factory = require("../utils/handleFactory");
const Job = require("../models/jobModel");

exports.deleteJob = factory.deleteOne(Job);
exports.updateJob = factory.updateOne(Job);
exports.findOne = factory.findOne(Job);
exports.findJob = factory.find(Job);
exports.createJob = factory.createOne(Job);
