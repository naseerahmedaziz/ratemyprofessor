const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = 'MY_SECRET_KEY';
const mongoose = require("mongoose");
const teacher = require("../models/teacher");

//this is working now as well
const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if the user with the provided email already exists
    const checkExistingUser = await userModel.findOne({ email: email });

    if (checkExistingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the provided data
    const result = await userModel.create({
      firstName: firstName, 
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: result.email, id: result.id },
      SECRET_KEY
    );

    res.status(200).json({ user: result, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in signup" });
  }
};

//this is working now as well
const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not Found" });
    }
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET_KEY
    );
    res.status(200).json({ user: existingUser, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
  }
};

const updateAccount = async (req, res) => {
  const { id } = req.params; 
  const { firstName, lastName, email, university } = req.body; 

  try {
    // Find the user by ID
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the email is changing and, if so, if it's taken by another user
    if (email && email !== user.email) {
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;

    user.university = university || user.university;

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user details" });
  }
};


const deleteTeacher = async (req, res) => {
  const { userId } = req.body;

  try {
    console.log("Deleting account with ID:", userId);


    const userObjectId = new mongoose.Types.ObjectId(userId);


    const deleteResult = await teacher.updateOne(
      { "_id": userObjectId },
      { $set: { isActive: false } } 
    );

    console.log("Delete result:", deleteResult);

    if (deleteResult.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting the account" });
  }
};


module.exports = { signup, signin, updateAccount, deleteTeacher };
