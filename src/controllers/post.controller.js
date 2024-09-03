const postService = require("../services/post.service");

const createPost = (req, res) => {
  const title = req.body.title;
  const image = req.body.image;
  postService
    .createPost(title, image)
    .then((postId) => {
      res.status(201).json({
        success: true,
        postId,
        message: "New post created successfully",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        errors: err,
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
        errors: err,
        message: "Something went wrong while retriving the public posts",
      });
    });
};

module.exports = {
  createPost,
  getPosts,
};
