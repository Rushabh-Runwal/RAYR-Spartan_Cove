import mongoose from "mongoose";
import Message from "../models/Message.model.js";
import Group from "../models/group.model.js";
import asyncHander from "express-async-handler";

/**
 * Retrieves all messages from the database.
 *
 * @async
 * @function getAllMessages
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<Object>} - A JSON response containing all messages, or an error message if there was a problem.
 */
export const getAllMessages = asyncHander(async (req, res) => {
  try {
    const groupId = req.params.id;
    const message_ids = await Group.findById(groupId).select("messages");
    const messages = await Message.find({ _id: { $in: message_ids.messages } }).populate(
      "sender",
      "name email"
    );
    
    console.log('The messages are ' + messages )
    res.status(200).json(messages);
  } catch (error) {
    console.log("error in fetching messages:", error.message);
    res.status(500).json("error in fetching messages:", error.message);
  }
});

/**
 * Creates a new message in a group.
 *
 * @async
 * @function createMessage
 * @param {Object} req - The Express request object.
 * @param {Object} req.body - The request body containing message details.
 * @param {string} req.body.senderId - The ID of the user sending the message.
 * @param {string} req.body.groupId - The ID of the group the message belongs to.
 * @param {string} req.body.content - The content of the message.
 * @param {string} req.body.attachmentUrl - The URL of any attachment associated with the message.
 * @param {string} req.body.messageType - The type of the message (e.g. text, image, etc.).
 * @param {Object} res - The Express response object.
 * @returns {Promise<Object>} - A JSON response containing the newly created message, or an error message if there was a problem.
 */
export const createMessage = asyncHander(async (req, res) => {
  try {
    const { senderId, groupId, content, attachmentUrl, messageType } = req.body;
    const group = await Group.findById(groupId);
    // console.log("group", group);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    const newMessage = new Message({
      sender: senderId,
      group: groupId,
      content,
      attachmentUrl,
      messageType,
    });

    // console.log("newMessage", newMessage);
    await newMessage.save();

    // Add the message to the group and update lastMessage
    group.messages.push(newMessage._id);
    group.lastMessage = newMessage._id;

    await group.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in Create message:", error.message);
    res.status(500).json("Error in Create message:", error.message);
  }
});

/**
 * Updates an existing message in the database.
 *
 * @async
 * @function updateMessage
 * @param {Object} req - The Express request object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.id - The ID of the message to update.
 * @param {Object} req.body - The request body containing the updated message details.
 * @param {Object} res - The Express response object.
 * @returns {Promise<Object>} - A JSON response containing the updated message, or an error message if there was a problem.
 */
export const updateMessage = asyncHander(async (req, res) => {
  const { id } = req.params;

  const message = req.body;
  // console.log(message);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid user Id" });
  }

  try {
    const updatedMessage = await Message.findByIdAndUpdate(id, message, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedMessage });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});
