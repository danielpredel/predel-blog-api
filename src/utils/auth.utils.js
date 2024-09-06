const bcrypt = require("bcrypt");
const saltRounds = 10;
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

// Cypher Password
const cypherPassword = (password) => {
  return bcrypt
    .genSalt(saltRounds)
    .then((salt) => bcrypt.hash(password, salt))
    .then((hash) => {
      return hash;
    })
    .catch((err) => {
      throw new Error(
        "An error ocurred while hashing the password: " + err.mesage
      );
    });
};

// Compare Password
const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};

// Create Token
const createToken = (payload) => {
  const options = {
    expiresIn: "1h",
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, options);
  return token;
};

// Create Validation Code
function createVerificationCode() {
  return uuidv4();
}

module.exports = {
  cypherPassword,
  createVerificationCode,
  createToken,
  comparePassword,
};
