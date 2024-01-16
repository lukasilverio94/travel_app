import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    writer: {
      type: String,
      // ref: 'User',
      required: false,
    },
    writerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    images: [
      {
        type: String, // Assuming you're storing the file paths or URLs
        required: false,
      },
    ],

    ratings: {
      type: [Number],
      default: [],
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
