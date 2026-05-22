const express = require("express");
const router = express.Router();
const {
  getMentors,
  getMentorById,
  createMentor,
  updateMentor,
  deleteMentor
} = require("../controllers/mentorController");
const { protect } = require("../middleware/authMiddleware");

router.route("/")
  .get(protect, getMentors)
  .post(protect, createMentor);

router.route("/:id")
  .get(protect, getMentorById)
  .put(protect, updateMentor)
  .delete(protect, deleteMentor);

module.exports = router;