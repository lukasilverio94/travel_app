import mongoose from 'mongoose';

const { Schema } = mongoose;

const replySchema = new Schema({
  writer: {
    type: String,
    required: false,
  },
  text: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reply',
    },
  ],
});

const Reply = mongoose.model('Reply', replySchema);

export default Reply;
