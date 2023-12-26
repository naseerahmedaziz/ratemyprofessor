const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "John Doe";

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
      firstName: firstName, // Use the correct variable name here
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });

    // Create a JWT token for the new user
    const token = jwt.sign(
      { email: result.email, id: result.id },
      "MY_SECRET_KEY"
    );

    // Return the user and token in the response
    res.status(201).json({ user: result, token: token });
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
    res.status(201).json({ user: existingUser, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
  }
};

// const viewAccount = async (req, res) => {
//   const token = req.headers.authorization;
//   try {
//     const decodedData = jwt.verify(token, SECRET_KEY);
//     const user = await userModel.findById(decodedData.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Error" });
//   }
// };

const updateAccount = async (req, res) => {
  // const token = req.headers.authorization;
  // if (!token) {
  //   return res.status(401).json({ message: "Unauthorized: Token missing" });
  // }
  try {
    // const decodedData = jwt.verify(token, SECRET_KEY);
    const userId = decodedData.id;

    if (req.body._id !== userId) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    if (req.body.email && !emailRegex.test(req.body.email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (req.body.password && req.body.password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    await userModel.findByIdAndUpdate(userId, req.body);

    res.status(200).json({ message: "Account details updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
  }
};

const deleteAccount = async (req, res) => {
  const token = req.headers.authorization;
  try {
    const decodedData = jwt.verify(token, SECRET_KEY);
    const userId = decodedData.id;

    console.log(`Deleting user with ID: ${userId}`);

    // Delete the user's account from the database
    const deletedUser = await userModel.findByIdAndRemove(userId);

    console.log(`Deleted user: ${JSON.stringify(deletedUser)}`);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
  }
};

module.exports = { signup, signin, updateAccount, deleteAccount };
