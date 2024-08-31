const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PostSchema = new Schema({
  title: String,
  body: String
});

const PostModel = mongoose.model("BlogPost", PostSchema, "userPosts");

module.exports = PostModel;
