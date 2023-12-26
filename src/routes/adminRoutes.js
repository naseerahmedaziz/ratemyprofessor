// adminRoutes.js

const express = require("express");
const {
  createTeacher,
  getTeachers,
  updateTeacher,
  deleteTeacher,
  findTeachers,
} = require("../controllers/adminController");
const adminRouter = express.Router();
const {adminAuthMiddleware} = require("./adminAuthMiddleware")

// Define admin-specific routes here
adminRouter.post("/adminLogin", adminAuthMiddleware);
adminRouter.post("/teachers", createTeacher);
adminRouter.get("/getTeachers", getTeachers);
adminRouter.get("/findTeachers", findTeachers);
// adminRouter.put("/teachers/:teacherId", updateTeacher);
// adminRouter.delete("/teachers/:teacherId", deleteTeacher);

module.exports = adminRouter;
