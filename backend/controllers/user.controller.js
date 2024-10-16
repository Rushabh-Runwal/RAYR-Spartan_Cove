import mongoose from "mongoose";
import User from "../models/user.model.js";
import asyncHander from "express-async-handler";

/**
 * Registers a new user in the system.
 * Public route.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The user data to be registered.
 * @param {string} res.body.uid - The user ID from google stored as _id for document.
 * @param {string} req.body.name - The name of the user.
 * @param {string} req.body.phoneNumber - The phone number of the user.
 * @param {string} req.body.email - The email address of the user.
 * @param {string} req.body.profilePicture - The profile picture of the user.
 * @param {string} req.body.statusMessage - The status message of the user.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} - The registered user object.
 */
export const upsertUser = asyncHander(async (req, res) => {
  const user = req.body;
  const userObejct = {
    _id: user.uid,
    name: user.name,
    phoneNumber: user.phoneNumber,
    email: user.email,
    profilePicture: user.profilePicture,
    statusMessage:
      "Joined my fellow Spartans at the SpartanCove - let the chats begin!",
  };
  if (user.email.endsWith("@sjsu.edu")) {
    const userExists = await User.findOne({ email: user.email });
    if (userExists) {
      res.status(200).json(userObejct);
    } else {
      const newUser = new User(userObejct);
      try {
        await newUser.save();
        res.status(201).json(userObejct);
      } catch (error) {
        console.error("Error in Create user:", error.message);
        res.status(500).json(error.message);
      }
    }
  } else {
    res.status(500).json("Only SJSU email addresses are allowed.");
  }
});

/**
 * Retrieves all users from the database.
 * Private route.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} - An array of user objects.
 */
export const getUsers = asyncHander(async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log("error in fetching users:", error.message);
    res.status(500).json(error.message);
  }
});

/**
 * Retrieves a user from the database by their ID and populates their associated groups.
 * Private route.
 *
 * @param {Object} req - The request object, containing the user ID in the params.
 * @param {Object} res - The response object, which will contain the retrieved user.
 * @returns {Promise<Object>} - The retrieved user object.
 */
export const getUser = asyncHander(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("groups");
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json(error.message);
  }
});

/**
 * Deletes a user from the database by their ID.
 * Private route.
 *
 * @param {Object} req - The request object, containing the user ID in the params.
 * @param {Object} res - The response object, which will contain the result of the deletion.
 * @returns {Promise<Object>} - A success message if the user was deleted successfully.
 */
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
