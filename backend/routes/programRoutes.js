const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram
} = require('../controllers/programController');

router.route('/')
  .get(getPrograms)
  .post(protect, createProgram);

router.route('/:id')
  .get(getProgramById)
  .put(protect, updateProgram)
  .delete(protect, deleteProgram);

module.exports = router;
