const fs = require('fs');
const path = require('path');
const Slide = require('../models/Slide');

const getSlidesDir = () => path.join(__dirname, '..', 'public', 'slides');

const ensureSlidesDir = async () => {
  const directory = getSlidesDir();
  await fs.promises.mkdir(directory, { recursive: true });
  return directory;
};

const getLocalImageExtension = (mimeType) => {
  const extensions = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'image/svg+xml': 'svg',
  };
  return extensions[mimeType] || 'png';
};

const isDataUrl = (value) => typeof value === 'string' && value.startsWith('data:');
const isLocalUploadPath = (value) => typeof value === 'string' && value.startsWith('/uploads/slides/');

const saveImageFromDataUrl = async (dataUrl) => {
  if (!isDataUrl(dataUrl)) {
    return dataUrl;
  }

  const matches = dataUrl.match(/^data:(.+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error('Invalid image data format');
  }

  const mimeType = matches[1];
  const base64Data = matches[2];
  const extension = getLocalImageExtension(mimeType);
  const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${extension}`;
  const directory = await ensureSlidesDir();
  const filePath = path.join(directory, fileName);

  await fs.promises.writeFile(filePath, Buffer.from(base64Data, 'base64'));
  return `/uploads/slides/${fileName}`;
};

const removeLocalImage = async (imagePath) => {
  if (!isLocalUploadPath(imagePath)) {
    return;
  }

  const fileName = imagePath.replace('/uploads/slides/', '');
  const filePath = path.join(getSlidesDir(), fileName);

  try {
    await fs.promises.unlink(filePath);
  } catch (error) {
    // Ignore if file does not exist or can't be removed
  }
};

const getSlides = async (req, res) => {
  try {
    const filter = { active: true };
    if (req.query.section) {
      filter.section = req.query.section;
    }
    const slides = await Slide.find(filter).sort({ order: 1, createdAt: 1 });
    res.json(slides);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getSlideById = async (req, res) => {
  try {
    const slide = await Slide.findById(req.params.id);
    if (slide) {
      res.json(slide);
    } else {
      res.status(404).json({ message: 'Slide not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createSlide = async (req, res) => {
  try {
    const { title, caption, image, section, order = 0, active = true } = req.body;

    if (!title || !image) {
      return res.status(400).json({ message: 'Title and image are required' });
    }

    const savedImage = await saveImageFromDataUrl(image);
    const slide = new Slide({ title, caption, image: savedImage, section, order, active });
    const createdSlide = await slide.save();
    res.status(201).json(createdSlide);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateSlide = async (req, res) => {
  try {
    const slide = await Slide.findById(req.params.id);
    if (slide) {
      const { title, caption, image, section, order, active } = req.body;

      if (title !== undefined) slide.title = title;
      if (caption !== undefined) slide.caption = caption;
      if (section !== undefined) slide.section = section;
      if (order !== undefined) slide.order = order;
      if (active !== undefined) slide.active = active;

      if (image !== undefined) {
        if (isDataUrl(image)) {
          await removeLocalImage(slide.image);
          slide.image = await saveImageFromDataUrl(image);
        } else {
          slide.image = image;
        }
      }

      const updatedSlide = await slide.save();
      res.json(updatedSlide);
    } else {
      res.status(404).json({ message: 'Slide not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteSlide = async (req, res) => {
  try {
    const slide = await Slide.findById(req.params.id);
    if (slide) {
      await removeLocalImage(slide.image);
      await slide.deleteOne();
      res.json({ message: 'Slide removed' });
    } else {
      res.status(404).json({ message: 'Slide not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getSlides,
  getSlideById,
  createSlide,
  updateSlide,
  deleteSlide
};
