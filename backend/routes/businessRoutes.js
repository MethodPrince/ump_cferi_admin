const express = require("express");
const router = express.Router();
const {
  getBusinesses,
  getBusinessById,
  createBusiness,
  updateBusiness,
  deleteBusiness
} = require("../controllers/businessController");
const { protect } = require("../middleware/authMiddleware");

router.route("/")
  .get(getBusinesses)
  .post(protect, createBusiness);

router.route("/:id")
  .get(getBusinessById)
  .put(protect, updateBusiness)
  .delete(protect, deleteBusiness);

module.exports = router;