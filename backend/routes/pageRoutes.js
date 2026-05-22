const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getPages,
  getPageBySlug,
  getPageById,
  createPage,
  updatePage,
  deletePage
} = require('../controllers/pageController');

router.route('/')
  .get(getPages)
  .post(protect, createPage);

router.route('/slug/:slug')
  .get(getPageBySlug);

router.route('/:id')
  .get(getPageById)
  .put(protect, updatePage)
  .delete(protect, deletePage);

module.exports = router;
