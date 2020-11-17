import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: "comment is required",
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
  },
  anonymousCreator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AnonymousUser",
  },
});

const model = mongoose.model("Comment", CommentSchema);

export default model;
