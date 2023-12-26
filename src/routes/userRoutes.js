const express = require("express");
const { signup, signin, viewAccount, updateAccount, deleteAccount } = require("../controllers/userController");
const userRouter = express.Router();
//this is working now as well
userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
// userRouter.get("/account", viewAccount);
userRouter.patch("/updateAccount", updateAccount);

// New route for deleting an account
// userRouter.delete("/account", deleteAccount);

module.exports = userRouter;


