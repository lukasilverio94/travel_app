import mongoose from 'mongoose';

const { Schema } = mongoose;

const commentSchema = new Schema({
  writer: {
    type: String,
    required: false,
  },
  commentText: {
    type: String,
    required: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: false,
  },
  replies: [
    {
      replyText: String, // Assuming replyText is a string
      writer: String,
    },
  ],
},
{ timestamps: true }
);


const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
