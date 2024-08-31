const Post = require("../models/post.model");

const createPost = (title, image) => {
  const post = new Post();
  post.title = title;
  post.image = image;
  return post
    .save()
    .then((savedPost) => {
      return savedPost.id;
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  createPost,
};