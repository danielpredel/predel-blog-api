const postService = require("../services/post.service");

const createPost = (req, res) => {
  const title = req.body.title;
  const image = req.body.image;
  postService
    .createPost(title, image)
    .then((postId) => {
      res.status(201).json({ success: true, postId });
    })
    .catch((err) => {
      return res.status(400).json({ errors: err });
    });
};

module.exports = {
  createPost,
};
