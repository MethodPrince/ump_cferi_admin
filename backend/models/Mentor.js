const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
    expertise: { type: String, required: true },
    bio: String,
    availability: { 
      type: String, 
      enum: ['available', 'unavailable', 'limited'],
      default: 'available'
    },
    company: String,
    yearsExperience: Number,
    linkedin: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mentor", mentorSchema);