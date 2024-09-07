const postService = require("../services/post.service");

const createPost = (req, res) => {
  const title = req.body.title;
  const image = req.body.image;
  const userName = req.userName;
  const userId = req.userId;
  postService
    .createPost(title, image, userName, userId)
    .then((postId) => {
      res.status(201).json({
        success: true,
        postId,
        message: "New post created successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        errors: err.message,
        message: "Something went wrong while creating the post",
      });
    });
};

const getPosts = (req, res) => {
  postService
    .getPosts()
    .then((posts) => {
      res.status(200).json({
        success: true,
        posts,
        message: "Public post retrived successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        errors: err.message,
        message: "Something went wrong while retriving the public posts",
      });
    });
};

const getUserPost = (req, res) => {
  const userId = req.userId;
  const postId = req.params.id;
  console.log(`User: ${userId} - postId: ${postId}`);
  postService
    .getUserPost(userId, postId)
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "The post does not exist",
        });
      }
      return res.status(200).json({
        success: true,
        post,
        message: "User's post retrived successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        errors: err.message,
        message: "Something went wrong while retriving a user's post",
      });
    });
};

module.exports = {
  createPost,
  getPosts,
  getUserPost,
};
