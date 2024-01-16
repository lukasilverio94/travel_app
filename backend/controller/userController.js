// test
import dotenv from "dotenv";
import User from "../models/userModel.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();
// Firebase
import { uploadImage } from "./uploadController.js";

//Function sign up
export const signup = async (req, res) => {
  // Hash the user's password using bcrypt with a salt factor of 12
  let hashedPass = bcrypt.hashSync(req.body.password, 12);

  // Create a new user object with hashed password
  let userObj = {
    ...req.body,
    password: hashedPass,
  };

  // Create a new user model instance
  let newUser = new User(userObj);

  try {
    // Save the new user to the database
    console.log("Received signup request:", req.body);
    await newUser.save();

    // Send a success response if the user is saved successfully
    res.status(200).send("User saved successfully");
    console.log("User is saved", req.body);
  } catch (error) {
    // Handle errors during user saving process
    if (error.code === 11000) {
      // Duplicate key error (unique constraint violation)
      res.status(400).send("This email is already taken");
    } else {
      // Other errors
      console.error(error);
      res.status(500).send("An error occurred while saving the user.");
    }
  }
};

// Function for user login
export const login = async (req, res) => {
  // Log the incoming login request data
  console.log("Request to login:", req.body);

  try {
    // Find a user in the database with the provided email
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      // If the user is not found, send a 400 Bad Request response
      return res.status(400).send("User not found");
    }

    // Compare the provided password with the hashed password stored in the database
    let isCorrectPass = await bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isCorrectPass) {
      // If the password is incorrect, send a 400 Bad Request response
      return res.status(400).send("Invalid email or password");
    }

    // If the user and password are correct, generate a JWT token for authentication
    let userInfoForToken = {
      id: user._id,
      userName: user.userName,
      email: user.email,
      avatar: user.avatar,
    };

    let userToken = jwt.sign({ userInfoForToken }, process.env.SECRET);

    // Send the generated token in the response
    res.status(200).send(userToken);
    console.log(`${userInfoForToken.userName} is inLogged`);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred during login.");
  }
};

export const verifyUser = async (req, res) => {
  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.SECRET
    );

    res.status(200).json({
      userId: decoded?.userInfoForToken?.id,
      username: decoded?.userInfoForToken?.userName,
      avatar: decoded?.userInfoForToken?.avatar,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

export const searchUser = async (req, res) => {
  try {
    // Get the username from the request parameters
    const { username } = req.params;
    let user = await User.findOne({ userName: username }).populate("posts");
    if (user) {
      let userInfo = {
        id: user._id,
        userName: user.userName,
        email: user.email,
        posts: user.posts,
        avatar: user.avatar,
      };
      res.status(200).json({ userInfo });
    } else {
      console.log("User not found");
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  // Check if Id matches the MongoDB standard
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  try {
    const newUser = {};

    // Check if there is an uploaded image

    if (req.file) {
      // Call the function to upload the image to Firebase Storage
      const avatarURL = await uploadImage(req.file);
      newUser.avatar = avatarURL;
    }

    console.log("Req files from user: ", req.file);
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { avatar: newUser.avatar },
      { new: true }
    );

    console.log("Updated user: ", updatedUser);
    // Handle the updated user as needed
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
