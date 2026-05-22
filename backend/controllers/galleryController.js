const GalleryImage = require('../models/GalleryImage');

const getGalleryImages = async (req, res) => {
  try {
    const images = await GalleryImage.find({ active: true }).sort({ order: 1, createdAt: 1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getGalleryImageById = async (req, res) => {
  try {
    const image = await GalleryImage.findById(req.params.id);
    if (image) {
      res.json(image);
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createGalleryImage = async (req, res) => {
  try {
    const galleryImage = new GalleryImage(req.body);
    const createdImage = await galleryImage.save();
    res.status(201).json(createdImage);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateGalleryImage = async (req, res) => {
  try {
    const image = await GalleryImage.findById(req.params.id);
    if (image) {
      Object.assign(image, req.body);
      const updatedImage = await image.save();
      res.json(updatedImage);
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteGalleryImage = async (req, res) => {
  try {
    const image = await GalleryImage.findById(req.params.id);
    if (image) {
      await image.deleteOne();
      res.json({ message: 'Image removed' });
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getGalleryImages,
  getGalleryImageById,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage
};