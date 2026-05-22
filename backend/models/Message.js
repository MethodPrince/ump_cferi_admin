const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderName: { type: String, required: true },
    senderEmail: { type: String, required: true },
    message: { type: String, required: true },
    reply: String,
    status: { type: String, default: "unanswered" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);