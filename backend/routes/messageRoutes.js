const express = require("express");
const router = express.Router();
const {
  getMessages,
  getMessageById,
  createMessage,
  replyToMessage,
  updateMessageStatus,
  deleteMessage
} = require("../controllers/messageController");
const { protect } = require("../middleware/authMiddleware");

router.route("/")
  .get(protect, getMessages)
  .post(createMessage);

router.route("/:id/status")
  .patch(protect, updateMessageStatus);

router.route("/:id")
  .get(protect, getMessageById)
  .put(protect, replyToMessage)
  .delete(protect, deleteMessage);

module.exports = router;