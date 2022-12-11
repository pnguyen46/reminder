const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.signUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.sendStatus(409);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const startingInfo = {
    name: "",
    age: "",
    dob: "",
  };

  const result = await User.create({
    email,
    passwordHash,
    info: startingInfo,
    isVerified: false,
  });

  const { insertedId } = result;

  jwt.sign(
    {
      id: insertedId,
      email,
      info: startingInfo,
      isVerified: false,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2d",
    },
    (error, token) => {
      if (error) {
        return res.status(500).send(error);
      }
      return res.status(200).json({ token });
    }
  );
};
