const express = require("express");
const jwt = require("jsonwebtoken");
const {
  createTeacher,
  getTeachers,
  updateTeacher,
  deleteTeacher,
  findTeachers,
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
  const bearerToken = bearer[1]; // Get the token part

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

// Define admin-specific routes here
adminRouter.post("/adminLogin", adminAuthMiddleware);
adminRouter.post("/teachers", verifyToken, createTeacher);
//update teacher with jwt


//find teacher should be in user flow
adminRouter.get("/getTeachers", getTeachers);
adminRouter.get("/findTeachers", findTeachers);
// adminRouter.put("/teachers/:teacherId", updateTeacher);
// adminRouter.delete("/teachers/:teacherId", deleteTeacher);

module.exports = adminRouter;
