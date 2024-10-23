import mongoose from "mongoose";
import Group from "../models/group.model.js";
import User from "../models/user.model.js";
import asyncHander from "express-async-handler";

/**
 * Retrieves all groups from the database and returns them in the response.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} - A Promise that resolves when the response is sent.
 */
export const getAllGroups = asyncHander(async (req, res) => {
  try {
    const group_ids = req.user?.groups;
    const groups = await Group.find({ _id: { $in: group_ids } })
      .populate("participants")
      .populate("lastMessage")
      .sort({ updatedAt: -1 });
    // const groups = await Group.find({});
    res.status(200).json(groups);
  } catch (error) {
    console.log("error in fetching groups:", error.message);
    res.status(500).json(error.message);
  }
});

/**
 * Retrieves a group from the database by its ID, and populates the admin, participants, and messages fields.
 *
 * @param {Object} req - The Express request object, containing the group ID in the params.
 * @param {Object} res - The Express response object, which will contain the group data if found.
 * @returns {Promise<void>} - A Promise that resolves when the response is sent.
 */
export const getGroup = asyncHander(async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate("admin participants")
      .populate({
        path: "messages",
        populate: { path: "sender", select: "name email" },
      });

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    res.status(200).json(group);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * Creates a new group with the provided name, admin, and participants.
 *
 * @param {Object} req - The Express request object, containing the group details in the request body.
 * @param {string} req.body.name - The name of the new group.
 * @param {string} req.body.admin - The ID of the user who will be the admin of the new group.
 * @param {string[]} req.body.participants - An array of user IDs who will be participants in the new group.
 * @param {Object} res - The Express response object, which will contain the newly created group.
 * @returns {Promise<void>} - A Promise that resolves when the response is sent.
 */
export const createGroup = asyncHander(async (req, res) => {
  const { name, admin, participants } = req.body;

  if (!name || !admin || !participants) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }
  const newGroup = new Group({
    name,
    admin,
    participants,
  });
  // console.log("newGroup", newGroup);
  const adminUser = await User.findById(newGroup.admin);
  if (!adminUser) {
    return res.status(404).json({ error: "Admin not found" });
  }

  // Add the group to each participant's list of groups
  await Promise.all(
    participants.map(async (userId) => {
      await User.findByIdAndUpdate(userId, { $push: { groups: newGroup._id } });
    })
  );

  try {
    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    console.error("Error in Create group:", error.message);
    res.status(500).json(error.message);
  }
});

export const updateGroup = asyncHander(async (req, res) => {
  const { id } = req.params;

  const group = req.body;
  // console.log(group);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid user Id" });
  }

  try {
    const updatedGroup = await User.findByIdAndUpdate(id, group, {
      new: true,
    });
    res.status(200).json(updatedGroup);
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

export const getMessagesInGroup = asyncHander(async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate({
      path: "messages",
      populate: { path: "sender", select: "name email" },
    });

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    res.status(200).json(group.messages);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export const createMessagesInGroup = asyncHander(async (req, res) => {
  const { senderId, content, attachmentUrl, messageType } = req.body;
  const groupId = req.params.id;
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

  group.messages.push(newMessage._id);
  group.lastMessage = newMessage._id;
  await group.save();
  res.status(201).json(newMessage);
  // console.log("message created successfully");
});

export const deleteGroup = asyncHander(async (req, res) => {
  try {
    const { id } = req.params;
    const group = await Group.findById(id);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    await Group.findByIdAndDelete(id);
    res.status(200).json("Group deleted successfully");
    // Remove the group from each participant's list of groups
    await Promise.all(
      group.participants.map(async (userId) => {
        await User.findByIdAndUpdate(userId, { $pull: { groups: id } });
      })
    );
    console.log("group deleted successfully");
  } catch (error) {
    res.status(500).json(error.message);
  }
});
