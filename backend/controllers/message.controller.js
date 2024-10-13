import mongoose from "mongoose";
import Message from "../models/Message.model.js";
import Group from "../models/group.model.js";

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find({});
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.log("error in fetching messages:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createMessage = async (req, res) => {
  try {
    const { senderId, groupId, content, attachmentUrl, messageType } = req.body;
    const group = await Group.findById(groupId);
    console.log("group", group);
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
    res.status(201).json({ success: true, data: newMessage });
  } catch (error) {
    console.error("Error in Create message:", error.message);
    res.status(500).json({ success: false, message: error });
  }
};

export const updateMessage = async (req, res) => {
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
};
