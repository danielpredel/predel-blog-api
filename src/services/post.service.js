const Post = require("../models/post.model");

const createPost = (title, image, author, authorId, authorImage) => {
  const post = new Post();
  post.title = title;
  post.image = image;
  post.author = author;
  post.authorId = authorId;
  post.authorImage = authorImage;

  return post
    .save()
    .then((savedPost) => {
      return savedPost.id;
    })
    .catch((err) => {
      throw new Error(
        "An error ocurred while creating a new post: " + err.message
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
      "An error ocurred while searching public posts: " + err.message
    );
  }
};

// All user's posts
const getUserPosts = (userId) => {};

// A single public post
const getPost = async (postId) => {
  try {
    const post = await Post.findOne(
      { _id: postId, hidden: false },
      { _id: 1, title: 1, author: 1, publishDate: 1, image: 1 }
    );
    return post;
  } catch (err) {
    throw new Error(
      "An error ocurred while searching for this post: " + err.message
    );
  }
};

// A user's post
const getUserPost = async (userId, postId) => {
  try {
    const post = await Post.findOne(
      { _id: postId, authorId: userId },
      { title: 1, body: 1, hidden: 1 }
    );
    return post;
  } catch (err) {
    throw new Error(
      "An error ocurred while searching for this post: " + err.message
    );
  }
};

const updatePost = async (postId, userId, postBody, postHidden) => {
  try {
    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId, authorId: userId },
      { body: postBody, hidden: postHidden },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedPost) {
      return { success: false, message: "No post found or no update made" };
    }

    return { success: true, message: "Post successfully updated" };
  } catch (error) {
    return {
      success: false,
      message: "Error updating post",
      error: error.message,
    };
  }
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  getUserPosts,
  getUserPost,
  updatePost,
};
