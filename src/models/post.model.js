const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  author: String,
  body: {
    type: [Object]
  },
  date: {
    type: Date
  },
  hidden: Boolean,
  image: String
});

const postModel = mongoose.model("Post", postSchema, "posts");

module.exports = postModel;
