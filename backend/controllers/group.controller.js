import mongoose from "mongoose";
import Group from "../models/group.model.js";

export const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find({});
    res.status(200).json({ success: true, data: groups });
  } catch (error) {
    console.log("error in fetching groups:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getGroup = async (req, res) => {
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
};

export const createGroup = async (req, res) => {
  const group = req.body;

  if (!group.admin || !group.participants || !group.name) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }
  const newGroup = new Group(group);
  const admin = await User.findById(newGroup.admin);
  if (!admin) {
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
    res.status(201).json({ success: true, data: newGroup });
  } catch (error) {
    console.error("Error in Create group:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateGroup = async (req, res) => {
  const { id } = req.params;

  const group = req.body;
  console.log(group);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid user Id" });
  }

  try {
    const updateGroup = await User.findByIdAndUpdate(id, group, {
      new: true,
    });
    res.status(200).json({ success: true, data: updateGroup });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

export const getMessagesInGroup = async (req, res) => {
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
};
