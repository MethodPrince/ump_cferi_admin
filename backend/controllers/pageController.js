const Page = require('../models/Page');

const getPages = async (req, res) => {
  try {
    const query = req.query.admin === 'true' ? {} : { active: true };
    const pages = await Page.find(query).sort({ order: 1, title: 1 });
    res.json(pages);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getPageBySlug = async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug, active: true });
    if (page) {
      res.json(page);
    } else {
      res.status(404).json({ message: 'Page not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getPageById = async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    if (page) {
      res.json(page);
    } else {
      res.status(404).json({ message: 'Page not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createPage = async (req, res) => {
  try {
    const page = new Page(req.body);
    const createdPage = await page.save();
    res.status(201).json(createdPage);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updatePage = async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    if (page) {
      Object.assign(page, req.body);
      const updatedPage = await page.save();
      res.json(updatedPage);
    } else {
      res.status(404).json({ message: 'Page not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deletePage = async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    if (page) {
      await page.deleteOne();
      res.json({ message: 'Page removed' });
    } else {
      res.status(404).json({ message: 'Page not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getPages,
  getPageBySlug,
  getPageById,
  createPage,
  updatePage,
  deletePage
};
