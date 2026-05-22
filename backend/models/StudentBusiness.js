const mongoose = require("mongoose");

const studentBusinessSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    owner: { type: String, required: true },
    industry: { type: String, required: true },
    description: String,
    yearStarted: Number,
    jobsCreated: { type: Number, default: 0 },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("StudentBusiness", studentBusinessSchema);