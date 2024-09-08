const postService = require("../services/post.service");
const { createToken } = require("../utils/auth.utils");
const { getStringDate } = require("../utils/date.utils");

const createPost = (req, res) => {
  const title = req.body.title;
  const image = req.body.image;
  const userName = req.userName;
  const userImage = req.userImage;
  const userId = req.userId;
  const userVerified = req.userVerified;
  postService
    .createPost(title, image, userName, userId, userImage)
    .then((postId) => {
      const token = createToken(userId, userVerified);
      res.status(201).json({
        success: true,
        token,
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

const getPost = (req, res) => {
  const postId = req.params.id;
  postService
    .getPost(postId)
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "The post does not exist",
        });
      }
      const date = getStringDate(post.creationDate);
      return res.status(200).json({
        success: true,
        post: {
          _id: post.id,
          body: post.body,
          author: post.author,
          title: post.title,
          creationDate: date,
        },
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

const getUserPost = (req, res) => {
  const userId = req.userId;
  const postId = req.params.id;
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

const updatePost = async (req, res) => {
  const userId = req.userId;
  const postId = req.params.id;
  const { body, hidden } = req.body;
  try {
    const result = await postService.updatePost(postId, userId, body, hidden);

    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  createPost,
  getPosts,
  getUserPost,
  getPost,
  updatePost,
};
