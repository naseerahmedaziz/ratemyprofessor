// adminRoutes.js

const express = require("express");
const {
  createTeacher,
  getTeachers,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/adminController");
const adminRouter = express.Router();
//const adminAuthMiddleware = require("./adminAuthMiddleware"); // Require the admin authentication middleware

//adminRouter.use(adminAuthMiddleware); // Apply admin authentication middleware

// Define admin-specific routes here
adminRouter.post("/teachers", createTeacher);
adminRouter.get("/getTeachers", getTeachers);
// adminRouter.put("/teachers/:teacherId", updateTeacher);
// adminRouter.delete("/teachers/:teacherId", deleteTeacher);

module.exports = adminRouter;
