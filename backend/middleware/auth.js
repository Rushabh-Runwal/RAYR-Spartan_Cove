import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      //decodes token id
      const decoded = jwt.decode(token);
      req.user = await User.findById(decoded.user_id);
      console.log("req.user", req.user); // getting user from token
      if (req.user) {
        next();
      } else {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export default protect;
