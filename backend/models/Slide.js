const mongoose = require('mongoose');

const slideSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    caption: { type: String, default: '' },
    image: { type: String, required: true },
    section: {
      type: String,
      enum: ['home', 'programs', 'gallery', 'about', 'other'],
      default: 'home'
    },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Slide', slideSchema);
