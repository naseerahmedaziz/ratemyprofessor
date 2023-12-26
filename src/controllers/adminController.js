const TeacherModel = require("../models/teacher");

//this is working now as well
const createTeacher = async (req, res) => {
  const { name, subject, email } = req.body;

  try {
    const newTeacher = await TeacherModel.create({ name, subject, email });
    res.status(201).json(newTeacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating the teacher" });
  }
};

//this is working now as well
const getTeachers = async (req, res) => {
  try {
    const teachers = await TeacherModel.find();
    res.status(200).json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching teachers" });
  }
};

const findTeachers = async (req, res) => {
  const searchQuery = req.query.search; // Get the search query from the request's query string

  try {
    let query = {};

    // If a search query is provided, use it to filter teachers by name
    if (searchQuery) {
      query.name = { $regex: searchQuery, $options: "i" }; // Case-insensitive regex search
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
  const { name, subject } = req.body;

  try {
    const updatedTeacher = await TeacherModel.findByIdAndUpdate(teacherId, {
      name,
      subject,
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

const deleteTeacher = async (req, res) => {
  const { teacherId } = req.params;

  try {
    const deletedTeacher = await TeacherModel.findByIdAndRemove(teacherId);

    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting the teacher" });
  }
};

module.exports = {
  createTeacher,
  getTeachers,
  findTeachers,
  updateTeacher,
  deleteTeacher,
};
