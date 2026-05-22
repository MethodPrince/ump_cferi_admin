const StudentBusiness = require("../models/StudentBusiness");

// Get all businesses
const getBusinesses = async (req, res) => {
  try {
    const businesses = await StudentBusiness.find({});
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get single business
const getBusinessById = async (req, res) => {
  try {
    const business = await StudentBusiness.findById(req.params.id);
    if (business) {
      res.json(business);
    } else {
      res.status(404).json({ message: "Business not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create business (protected)
const createBusiness = async (req, res) => {
  try {
    const business = new StudentBusiness(req.body);
    const createdBusiness = await business.save();
    res.status(201).json(createdBusiness);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update business (protected)
const updateBusiness = async (req, res) => {
  try {
    const business = await StudentBusiness.findById(req.params.id);
    if (business) {
      Object.assign(business, req.body);
      const updatedBusiness = await business.save();
      res.json(updatedBusiness);
    } else {
      res.status(404).json({ message: "Business not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete business (protected)
const deleteBusiness = async (req, res) => {
  try {
    const business = await StudentBusiness.findById(req.params.id);
    if (business) {
      await business.deleteOne();
      res.json({ message: "Business removed" });
    } else {
      res.status(404).json({ message: "Business not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getBusinesses,
  getBusinessById,
  createBusiness,
  updateBusiness,
  deleteBusiness
};