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

  const result = await User.create({
    email,
    password: passwordHash,
    isVerified: false,
  });

  const { insertedId } = result;

  jwt.sign(
    {
      id: insertedId,
      email,
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

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.sendStatus(401);
  }

  const { _id: id, isVerified, password: passwordHash } = user;
  const isCorrect = await bcrypt.compare(password, passwordHash);
  if (isCorrect) {
    jwt.sign(
      { id, isVerified, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      },
      (error, token) => {
        if (error) {
          return res.status(500).json(error);
        }
        res.status(200).json({ token });
      }
    );
  } else {
    res.sendStatus(401);
  }
};
