const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getPartners,
  getPartnerById,
  createPartner,
  updatePartner,
  deletePartner
} = require('../controllers/partnerController');

router.route('/')
  .get(getPartners)
  .post(protect, createPartner);

router.route('/:id')
  .get(getPartnerById)
  .put(protect, updatePartner)
  .delete(protect, deletePartner);

module.exports = router;
