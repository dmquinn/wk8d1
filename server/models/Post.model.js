const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema({
  title: String,
  description: String,
  image: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Post", postSchema);
