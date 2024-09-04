const User = require("../models/user.model");
const {
  cypherPassword,
  createVerificationCode,
  createToken,
} = require("../utils/auth.utils");

const createUser = (name, lastname, image, email, password) => {
  return cypherPassword(password)
    .then((hash) => {
      const user = new User();
      user.name = name;
      user.lastname = lastname;
      user.image = image;
      user.email = email;
      user.verificationCode = createVerificationCode();
      user.password = hash;
      return user.save();
    })
    .then((savedUser) => {
      const token = createToken({
        id: savedUser.id,
        verified: savedUser.verified,
      });
      return {
        token,
        image: savedUser.image,
        verified: savedUser.verified,
      };
    })
    .catch((err) => {
      throw new Error("An error ocurred while creating a new user: " + err);
    });
};

const checkEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (err) {
    throw new Error(
      "An error ocurred while checking an email address: " + err?.toString()
    );
  }
};

module.exports = {
  createUser,
  checkEmail,
};
