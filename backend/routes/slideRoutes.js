const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getSlides,
  getSlideById,
  createSlide,
  updateSlide,
  deleteSlide
} = require('../controllers/slideController');

router.route('/')
  .get(getSlides)
  .post(protect, createSlide);

router.route('/:id')
  .get(getSlideById)
  .put(protect, updateSlide)
  .delete(protect, deleteSlide);

module.exports = router;
