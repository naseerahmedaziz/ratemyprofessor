const express = require("express");
const jwt = require("jsonwebtoken");
const {
  signup,
  signin,
  updateAccount,
  deleteTeacher
} = require("../controllers/userController");
const { findTeachers } = require("../controllers/adminController");
const userRouter = express.Router();
const mongoose = require("mongoose");

const SECRET_KEY = "MY_SECRET_KEY";

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    return res
      .status(403)
      .json({ message: "A token is required for authentication" });
  }

  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1];

  try {
    const decoded = jwt.verify(bearerToken, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid Token", error: err.message });
  }
};

//this is working now as well
userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.patch("/updateAccount/:id", verifyToken, updateAccount);
userRouter.get("/findTeachers", verifyToken, findTeachers);
userRouter.post('/deleteTeacher', deleteTeacher);

// New route for deleting an account
// userRouter.get("/account", viewAccount);
// userRouter.delete("/account", deleteAccount);

module.exports = userRouter;
