import Post from "../models/postModel.js";
import Comment from "../models/commentModel.js";
import User from "../models/userModel.js";
import fs from "fs";
import { uploadImage, deleteImageFromStorage } from "./uploadController.js";
import mongoose from "mongoose";

//Add New Travel
export const addNewTravel = async (req, res) => {
  const { title, place, description, writer, rating, writerId } = req.body;
  try {
    //Handling Errors (handle in frontend)
    let emptyFields = [];

    if (title.trim() === "") {
      emptyFields.push("title");
    }
    if (place.trim() === "") {
      emptyFields.push("load");
    }
    if (description.trim() === "") {
      emptyFields.push("reps");
    }
    if (emptyFields.length > 0) {
      return res.status(400).json({
        error: "Please fill in all fields",
        emptyFields,
      });
    }
    // Check if there are uploaded images
    let imagePaths = [];

    if (req.files && req.files.length > 0) {
      // Call the function to upload images to Firebase Storage
      imagePaths = await uploadImage(req.files);
    }

    //Add Doc
    const newTravel = {
      title,
      place,
      description,
      writer,
      rating,
      writerId,
      images: imagePaths,
    };

    const travel = await Post.create(newTravel);

    // Push only the post ID to the user's posts array
    await User.findByIdAndUpdate(
      req.body.writerId,
      { $push: { posts: travel._id } },
      { new: true }
    );

    return res.status(201).json(travel);
  } catch (error) {
    console.error("Error adding new travel:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//Get All Travels
export const getAllTravels = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  try {
    const travels = await Post.find({})
      .sort({ createdAt: -1 })
      .populate({
        path: "comments ratings", // Specify the fields to populate
        options: { sort: { created_at: -1 } }, // Sorting options
      })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return res.status(200).json(travels);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get Single Travel
export const getTravel = async (req, res) => {
  const { id } = req.params;
  //Check if Id matches mongo standard
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }
  const travel = await Post.findById(id).populate({
    path: "comments",
    options: { sort: { created_at: -1 } },
  });

  if (!travel) {
    return res.status(404).json({ error: "No such post" });
  }
  return res.status(200).json(travel);
};

//Update Travel
export const updateTravel = async (req, res) => {
  const { id } = req.params;

  // Check if Id matches mongo standard
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }

  try {
    let updatedTravel;

    if ("rating" in req.body) {
      const { rating } = req.body;

      updatedTravel = await Post.findOneAndUpdate(
        { _id: id },
        { $push: { ratings: rating } },
        { new: true }
      );

      return res.json({ post: updatedTravel });
    }

    // retrieve the post with existing information
    updatedTravel = await Post.findById(id);

    let newImages = [];
    if (req.files && req.files.length > 0) {
      // Call the function to upload images to Firebase Storage
      newImages = await uploadImage(req.files);
    }
    // Update general travel information and images
    updatedTravel = await Post.findOneAndUpdate(
      { _id: id },
      { ...req.body, images: [...updatedTravel.images, ...newImages] },
      { new: true }
    );

    return res.json({ post: updatedTravel });
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//Delete Travel
export const deleteTravel = async (req, res) => {
  const { id } = req.params;
  //Check if Id matches mongo standard
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }

  const workout = await Post.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ error: "No such post" });
  }

  res.status(200).json(workout);
};

//Delete image
export const deletePostImage = async (req, res) => {
  const { postId, filename } = req.params;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "No such post" });
    }

    // Find the image URL in the post's images array
    const imageUrl = post.images.find((image) => image.includes(filename));

    if (!imageUrl) {
      return res.status(404).json({ error: "Image not found" });
    }

    // Delete the image from Firebase Storage using the URL
    await deleteImageFromStorage(imageUrl);

    // Remove the image URL from the post's images array
    post.images = post.images.filter((image) => !image.includes(filename));

    // Save the updated post
    await post.save();

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
