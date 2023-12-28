const express = require("express");
const jwt = require("jsonwebtoken");
const {
  createTeacher,
  getTeachers,
  updateTeacher,
  deleteTeacher,
  findTeachers,
  editTeacher,
} = require("../controllers/adminController");
const adminRouter = express.Router();
const { adminAuthMiddleware } = require("./adminAuthMiddleware");
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

adminRouter.post("/adminLogin", adminAuthMiddleware);
adminRouter.post("/addTeacher", verifyToken, createTeacher);
adminRouter.patch("/editTeacher/:id", verifyToken, editTeacher);
//update teacher with jwt

//find teacher should be in user flow
adminRouter.get("/getTeachers", verifyToken, getTeachers);

module.exports = adminRouter;
