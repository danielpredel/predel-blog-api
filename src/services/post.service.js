const Post = require("../models/post.model");
const { getCurrentDate } = require("../utils/date.utils");

const createPost = (title, image) => {
  const post = new Post();
  post.title = title;
  post.image = image;
  post.hidden = true;
  //
  post.author = "Daniel Preciado Delgadillo";
  post.body = [];
  post.creationDate = getCurrentDate();

  return post
    .save()
    .then((savedPost) => {
      return savedPost.id;
    })
    .catch((err) => {
      throw new Error(
        "An error ocurred while creating a new post: " + err?.toString()
      );
    });
};

// All public posts
const getPosts = async () => {
  try {
    const posts = await Post.find(
      { hidden: false },
      { _id: 1, title: 1, author: 1, publishDate: 1, image: 1 }
    );
    return posts;
  } catch (err) {
    throw new Error(
      "An error ocurred while finding public posts: " + err?.toString()
    );
  }
};

// All user's posts
const getUserPosts = (userId) => {};

// A single public post
const getPost = (postId) => {};

// A user's post
const getUserPost = (postId) => {};

module.exports = {
  createPost,
  getPosts,
};
