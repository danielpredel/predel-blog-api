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
      const token = createToken(savedUser.id, savedUser.verified);
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
    return user ? true : false;
  } catch (err) {
    throw new Error(
      "An error ocurred while checking an email address: " + err.message
    );
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne(
      { email },
      { _id: 1, password: 1, image: 1, verified: 1 }
    );
    return user;
  } catch (err) {
    throw new Error(
      "An error ocurred while checking an email address: " + err.message
    );
  }
};

const getUserById = async (_id) => {
  try {
    const user = await User.findOne(
      { _id },
      { name: 1, lastname: 1, verified: 1, image: 1 }
    );
    return user;
  } catch (err) {
    throw new Error(
      "An error ocurred while checking an email address: " + err.message
    );
  }
};

module.exports = {
  createUser,
  checkEmail,
  getUserByEmail,
  getUserById,
};
