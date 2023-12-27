const express = require("express");
const {
  signup,
  signin,
  viewAccount,
  updateAccount,
  deleteAccount,
} = require("../controllers/userController");
const { findTeachers } = require("../controllers/adminController");
const userRouter = express.Router();

//this is working now as well
userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.patch("/updateAccount", updateAccount);
userRouter.get("/findTeachers", findTeachers);

// New route for deleting an account
// userRouter.get("/account", viewAccount);
// userRouter.delete("/account", deleteAccount);

module.exports = userRouter;
