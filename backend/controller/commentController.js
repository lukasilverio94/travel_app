import mongoose from 'mongoose';
// import Comment from '../models/commentModel';
import Comment from '../models/commentModel.js';
import Post from '../models/postModel.js';
export const addNewComment = async (req, res) => {
  console.log('comment request', req.body);

  const postId = req.body.postId;
  const comment = new Comment({
    commentText: req.body.commentText,
    writer: req.body.writer,
  });

  await comment.save();
  const thePost = await Post.findById(postId);

  thePost.comments.push(comment);
  await thePost.save();
  console.log('comment is pushed to post', req.body);

  res.status(200).json({ success: true });
};

//Delete comment
export const deleteComment = async (req, res) => {
  console.log('Request to delete:', req.params);
  const { id } = req.params;
  //Check if Id matches mongo standard
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such comment' });
  }

  const comment = await Comment.findByIdAndDelete(id);

  if (!comment) {
    return res.status(404).json({ error: 'No such comment' });
  }

  res.status(200).json(comment);
};

// updateComment with replies
export const updateComment = async (req, res) => {
  console.log('Request to reply:', req.params);
  const { id } = req.params;
  //Check if Id matches mongo standard
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such comment' });
  }

  try {
    // Update general comment information
    const updatedComment = await Comment.findOneAndUpdate(
      { _id: id },
      { $push: { replies: { replyText: req.body.replyText, writer: req.body.writer } } },
      { new: true },
    );

    res.json({ comment: updatedComment });
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// {
// Update general comment information
//   const uC = await Comment.findOneAndUpdate(
//     { _id: id },
//       { $push: { replise: req.body } },
//       { new: true },
//   );
//   res.json({ post: updatedComment });
// }
// const comment = await Comment.findByIdAndDelete(id);

// if (!comment) {
//   return res.status(404).json({ error: "No such comment" });
// }

// res.status(200).json(comment);
// };
