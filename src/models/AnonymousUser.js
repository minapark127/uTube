import mongoose from "mongoose";

const AnonymousSchema = new mongoose.Schema({
  name: String,
  avatarUrl: String,
});

const model = mongoose.model("AnonymousUser", AnonymousSchema);

export default model;
