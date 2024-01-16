import express from "express";
const router = express.Router();
import {
  addNewComment,

  deleteComment,
  updateComment
} from "../controller/commentController.js";

// Comment routes

router.post("/newComment", addNewComment);

router.delete("/delete/:id", deleteComment);
router.put("/update/:id", updateComment);
export default router;
