const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getGalleryImages,
  getGalleryImageById,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage
} = require('../controllers/galleryController');

router.route('/')
  .get(getGalleryImages)
  .post(protect, createGalleryImage);

router.route('/:id')
  .get(getGalleryImageById)
  .put(protect, updateGalleryImage)
  .delete(protect, deleteGalleryImage);

module.exports = router;
