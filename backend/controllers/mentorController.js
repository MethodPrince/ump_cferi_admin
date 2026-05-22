const Mentor = require("../models/Mentor");

// Get all mentors
const getMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find({}).sort({ name: 1 });
    res.json(mentors);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get single mentor
const getMentorById = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (mentor) {
      res.json(mentor);
    } else {
      res.status(404).json({ message: "Mentor not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create mentor
const createMentor = async (req, res) => {
  try {
    const mentor = new Mentor(req.body);
    const createdMentor = await mentor.save();
    res.status(201).json(createdMentor);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update mentor
const updateMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (mentor) {
      Object.assign(mentor, req.body);
      const updatedMentor = await mentor.save();
      res.json(updatedMentor);
    } else {
      res.status(404).json({ message: "Mentor not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete mentor
const deleteMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (mentor) {
      await mentor.deleteOne();
      res.json({ message: "Mentor removed" });
    } else {
      res.status(404).json({ message: "Mentor not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getMentors,
  getMentorById,
  createMentor,
  updateMentor,
  deleteMentor
};