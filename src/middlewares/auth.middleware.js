const authUtils = require("../utils/auth.utils");
const { getUserById } = require("../services/user.service");

const validateToken = (req, res, next) => {
  const token =
    req.header("Authorization") && req.header("Authorization").split(" ")[1];
  try {
    const user = authUtils.validateToken(token);
    req.userId = user.id;
    req.userVerified = user.verified;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Error related with token: " + err.message,
    });
  }
};

const validateUser = async (req, res, next) => {
  const id = req.userId;
  console.log(id);
  try {
    const user = await getUserById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "The user does not exist" });
    }
    req.userName = `${user.name} ${user.lastname}`;
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message:
        "An error has ocurred while searching for a user: " + err.message,
    });
  }
};

module.exports = {
  validateToken,
  validateUser,
};
