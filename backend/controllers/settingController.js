const Setting = require('../models/Setting');

const findOrCreateSettings = async () => {
  let settings = await Setting.findOne();
  if (!settings) {
    settings = await Setting.create({ slideInterval: 5000 });
  }
  return settings;
};

const getSettings = async (req, res) => {
  try {
    const settings = await findOrCreateSettings();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateSettings = async (req, res) => {
  try {
    const settings = await findOrCreateSettings();
    Object.assign(settings, req.body);
    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getSettings, updateSettings };
