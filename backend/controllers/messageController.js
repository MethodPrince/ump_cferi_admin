const Message = require("../models/Message");

// Get all messages (protected)
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get single message (protected)
const getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (message) {
      res.json(message);
    } else {
      res.status(404).json({ message: "Message not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create message (public)
const createMessage = async (req, res) => {
  try {
    const message = new Message({
      senderName: req.body.senderName,
      senderEmail: req.body.senderEmail,
      message: req.body.message,
      status: "unanswered"
    });
    const createdMessage = await message.save();
    res.status(201).json(createdMessage);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Reply to message (protected)
const replyToMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (message) {
      message.reply = req.body.reply;
      message.status = "answered";
      const updatedMessage = await message.save();
      res.json(updatedMessage);
    } else {
      res.status(404).json({ message: "Message not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update message status (protected)
const updateMessageStatus = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (message) {
      message.status = req.body.status;
      const updatedMessage = await message.save();
      res.json(updatedMessage);
    } else {
      res.status(404).json({ message: "Message not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete message (protected)
const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (message) {
      await message.deleteOne();
      res.json({ message: "Message removed" });
    } else {
      res.status(404).json({ message: "Message not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getMessages,
  getMessageById,
  createMessage,
  replyToMessage,
  updateMessageStatus,
  deleteMessage
};