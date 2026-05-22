const fs = require('fs');
const path = require('path');
const Partner = require('../models/Partner');

const getPartnersDir = () => path.join(__dirname, '..', 'public', 'partners');

const ensurePartnersDir = async () => {
  const directory = getPartnersDir();
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
const isLocalUploadPath = (value) => typeof value === 'string' && value.startsWith('/uploads/partners/');

const saveImageFromDataUrl = async (dataUrl) => {
  if (!isDataUrl(dataUrl)) return dataUrl;
  const matches = dataUrl.match(/^data:(.+);base64,(.+)$/);
  if (!matches || matches.length !== 3) throw new Error('Invalid image data format');
  const mimeType = matches[1];
  const base64Data = matches[2];
  const extension = getLocalImageExtension(mimeType);
  const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${extension}`;
  const directory = await ensurePartnersDir();
  const filePath = path.join(directory, fileName);
  await fs.promises.writeFile(filePath, Buffer.from(base64Data, 'base64'));
  return `/uploads/partners/${fileName}`;
};

const removeLocalImage = async (imagePath) => {
  if (!isLocalUploadPath(imagePath)) return;
  const fileName = imagePath.replace('/uploads/partners/', '');
  const filePath = path.join(getPartnersDir(), fileName);
  try {
    await fs.promises.unlink(filePath);
  } catch (error) {
    // ignore
  }
};

const getPartners = async (req, res) => {
  try {
    const filter = { active: true };
    const partners = await Partner.find(filter).sort({ order: 1, createdAt: 1 });
    res.json(partners);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getPartnerById = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (partner) res.json(partner);
    else res.status(404).json({ message: 'Partner not found' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createPartner = async (req, res) => {
  try {
    const { name, description, logo, link, order = 0, active = true } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });
    const savedLogo = await saveImageFromDataUrl(logo || '');
    const partner = new Partner({ name, description, logo: savedLogo, link, order, active });
    const created = await partner.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updatePartner = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) return res.status(404).json({ message: 'Partner not found' });
    const { name, description, logo, link, order, active } = req.body;
    if (name !== undefined) partner.name = name;
    if (description !== undefined) partner.description = description;
    if (link !== undefined) partner.link = link;
    if (order !== undefined) partner.order = order;
    if (active !== undefined) partner.active = active;
    if (logo !== undefined) {
      if (isDataUrl(logo)) {
        await removeLocalImage(partner.logo);
        partner.logo = await saveImageFromDataUrl(logo);
      } else {
        partner.logo = logo;
      }
    }
    const updated = await partner.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deletePartner = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) return res.status(404).json({ message: 'Partner not found' });
    await removeLocalImage(partner.logo);
    await partner.deleteOne();
    res.json({ message: 'Partner removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getPartners,
  getPartnerById,
  createPartner,
  updatePartner,
  deletePartner
};
