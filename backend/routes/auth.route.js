import express from "express";
const router = express.Router();

// Logout Route
router.get("/logout", (req, res) => {
  window.localStorage.removeItem("userInfo");
  req.logout();
  res.redirect("/");
});

export default router;
