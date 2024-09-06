const { createToken, comparePassword } = require("../utils/auth.utils");
const userService = require("../services/user.service");

const login = async (email, password) => {
  try {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return { success: false, message: "User not found" };
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return { success: false, message: "Incorrect password" };
    }
    const token = createToken(user._id, user.verified);
    return {
      success: true,
      user: { token, image: user.image, verified: user.verified },
    };
  } catch (err) {
    throw new Error(
      "An error ocurred while creating a new user: " + err.message
    );
  }
};

module.exports = {
  login,
};
