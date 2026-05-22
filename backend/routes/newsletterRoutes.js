const express = require('express');
const { getNewsletterPages, createNewsletterPage, updateNewsletterPage, deleteNewsletterPage } = require('../controllers/newsletterController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(getNewsletterPages).post(protect, createNewsletterPage);
router.route('/:id').put(protect, updateNewsletterPage).delete(protect, deleteNewsletterPage);

module.exports = router;
