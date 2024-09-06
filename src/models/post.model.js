const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  authorId: { type: String, required: true },
  body: { type: Array, default: [] },
  creationDate: { type: Date, default: Date.now },
  publishDate: { type: Date },
  editDate: { type: Date },
  hidden: { type: Boolean, default: true },
  image: { type: String, required: true },
});

const postModel = mongoose.model("Post", postSchema, "posts");

module.exports = postModel;
