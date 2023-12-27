const TeacherModel = require("../models/teacher");
const mongoose = require("mongoose");

//this is working now as well
const createTeacher = async (req, res) => {
  const { name, subject, email, university } = req.body;

  try {
    const newTeacher = await TeacherModel.create({ 
      name, 
      subject, 
      email,
      university
    });
    res.status(201).json(newTeacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating the teacher" });
  }
};

const editTeacher = async (req, res) => {
  const { id } = req.params;  // Assuming the teacher's ID is passed as a URL parameter
  const { name, subject, email, university } = req.body;

  try {
    // Find the teacher by ID
    const teacher = await TeacherModel.findById(id);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Update teacher details
    teacher.name = name || teacher.name;
    teacher.subject = subject || teacher.subject;
    teacher.email = email || teacher.email;
    teacher.university = university || teacher.university;

    // Save the updated teacher
    const updatedTeacher = await teacher.save();

    // Return the updated teacher details
    res.status(200).json(updatedTeacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating the teacher" });
  }
};

//this is working now as well
const getTeachers = async (req, res) => {
  try {
    const teachers = await TeacherModel.find();
    res.status(200).json(teachers);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error fetching teachers" });
  }
};

const findTeachers = async (req, res) => {
  const searchQuery = req.query.search; // Get the search query from the request's query string

  try {
    let query = {};
    if (searchQuery) {
      query.name = { $regex: searchQuery, $options: "i" }; 
    }
    const teachers = await TeacherModel.find(query);
    res.status(200).json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching teachers" });
  }
};

const updateTeacher = async (req, res) => {
  const { teacherId } = req.params;
  const { name, subject, university } = req.body;

  try {
    const updatedTeacher = await TeacherModel.findByIdAndUpdate(teacherId, {
      name,
      subject,
      university,
    });

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json(updatedTeacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating the teacher" });
  }
};

const findTeacherById = async (req, res) => {
  const { teacherId } = req.params; // Extract teacherId from the route parameters

  try {
    // Correctly convert the teacherId to a MongoDB ObjectId
    const teacherObjectId = new mongoose.Types.ObjectId(teacherId);

    // Find the teacher by their ID
    const teacher = await TeacherModel.findById(teacherObjectId);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Return the teacher data
    res.status(200).json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving teacher data" });
  }
};


module.exports = {
  createTeacher,
  getTeachers,
  findTeachers,
  updateTeacher,
  editTeacher,
  findTeacherById
};
