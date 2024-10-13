import mongoose from "mongoose";
import User from "../models/user.model.js";
import asyncHander from "express-async-handler";
import generateToken from "../config/generateToken.js";

export const registerUser = asyncHander(async (req, res) => {
  const user = req.body;

  if (!user.name || !user.phoneNumber || !user.email) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newUser = new User(user);

  try {
    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      phoneNumber: newUser.phoneNumber,
      email: newUser.email,
      profilePicture: newUser.profilePicture,
      statusMessage: newUser.statusMessage,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    console.error("Error in Create user:", error.message);
    res.status(500).json(error.message);
  }
});

export const getUsers = asyncHander(async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log("error in fetching users:", error.message);
    res.status(500).json(error.message);
  }
});

export const getUser = asyncHander(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("groups");
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json(error.message);
  }
});

export const updateUser = asyncHander(async (req, res) => {
  const { id } = req.params;

  const user = req.body;
  // console.log(user);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json("Invalid User Id");
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export const deleteUser = asyncHander(async (req, res) => {
  const { id } = req.params;
  console.log("id:" + id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json("Invalid User Id");
  }

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json("User Deleted Successfully");
  } catch (error) {
    console.log("error in deleting user:", error.message);
    res.status(500).json(error.message);
  }
});
