const authService = require("../services/auth.service");

const login = (req, res) => {
  const { email, password } = req.body;
  authService
    .login(email, password)
    .then((result) => {
      if (!result.success) {
        return res.status(401).json(result);
      }
      return res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(500).json({ success: false, message: err.message });
    });
};

module.exports = {
  login,
};
