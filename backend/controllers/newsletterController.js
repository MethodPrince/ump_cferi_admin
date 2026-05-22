const fs = require('fs');
const path = require('path');
const NewsletterPage = require('../models/NewsletterPage');

const getNewsletterDir = () => path.join(__dirname, '..', 'public', 'newsletter');

const ensureNewsletterDir = async () => {
  const directory = getNewsletterDir();
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
const isLocalUploadPath = (value) => typeof value === 'string' && value.startsWith('/uploads/newsletter/');

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
  const directory = await ensureNewsletterDir();
  const filePath = path.join(directory, fileName);

  await fs.promises.writeFile(filePath, Buffer.from(base64Data, 'base64'));
  return `/uploads/newsletter/${fileName}`;
};

const removeLocalImage = async (imagePath) => {
  if (!isLocalUploadPath(imagePath)) {
    return;
  }

  const fileName = imagePath.replace('/uploads/newsletter/', '');
  const filePath = path.join(getNewsletterDir(), fileName);

  try {
    await fs.promises.unlink(filePath);
  } catch (error) {
    // Ignore if file does not exist or can't be removed
  }
};

const getNewsletterPages = async (req, res) => {
  try {
    const pages = await NewsletterPage.find({ active: true }).sort({ order: 1, createdAt: 1 });
    res.json(pages);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createNewsletterPage = async (req, res) => {
  try {
    const { title, alt, image, order = 0, active = true } = req.body;

    if (!title || !image) {
      return res.status(400).json({ message: 'Title and image are required' });
    }

    const savedImage = await saveImageFromDataUrl(image);
    const newsletterPage = new NewsletterPage({
      title,
      alt,
      image: savedImage,
      order,
      active,
    });

    const createdPage = await newsletterPage.save();
    res.status(201).json(createdPage);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateNewsletterPage = async (req, res) => {
  try {
    const newsletterPage = await NewsletterPage.findById(req.params.id);
    if (!newsletterPage) {
      return res.status(404).json({ message: 'Newsletter page not found' });
    }

    const { title, alt, image, order, active } = req.body;

    if (title !== undefined) newsletterPage.title = title;
    if (alt !== undefined) newsletterPage.alt = alt;
    if (order !== undefined) newsletterPage.order = order;
    if (active !== undefined) newsletterPage.active = active;

    if (image !== undefined) {
      if (isDataUrl(image)) {
        await removeLocalImage(newsletterPage.image);
        newsletterPage.image = await saveImageFromDataUrl(image);
      } else {
        newsletterPage.image = image;
      }
    }

    const updatedPage = await newsletterPage.save();
    res.json(updatedPage);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteNewsletterPage = async (req, res) => {
  try {
    const newsletterPage = await NewsletterPage.findById(req.params.id);
    if (!newsletterPage) {
      return res.status(404).json({ message: 'Newsletter page not found' });
    }

    await removeLocalImage(newsletterPage.image);
    await newsletterPage.deleteOne();

    res.json({ message: 'Newsletter page removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getNewsletterPages,
  createNewsletterPage,
  updateNewsletterPage,
  deleteNewsletterPage,
};
