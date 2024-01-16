import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(

{
  userName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  posts:[{
    type:mongoose.Schema.Types.ObjectId,
    ref :'Post'
  }],
  avatar: {
    type: String,
    required: false,
  },
  
});


const User = mongoose.model("User", userSchema);

export default User;
