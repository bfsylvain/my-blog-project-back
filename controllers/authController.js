const userManager = require("../managers/UserManager");
const authManager = require("../managers/AuthManager");
const userModel = require("../models/user.model");
const Errors = require("../utils/errors.utils");
const jwt = require("jsonwebtoken");

const UserManager = new userManager();
const AuthManager = new authManager();

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

const signUp = async (req, res) => {
  const newUser = new userModel({
    pseudo: req.body.pseudo,
    email: req.body.email,
    password: req.body.password,
    likes: [],
  });
  try {
    const postUser = await UserManager.create(newUser);
    res.status(201).send(postUser);
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await AuthManager.identifyUser(email, password);
    const token = createToken({id: user._id, pseudo: user.pseudo});
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge });
    res.status(200).send({id: user._id, email: user.email});
  } catch (err) {
    res.status(200).send({error: "identifiants incorrects"});
  }
};

const logOut = async (_, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports = {
  signUp,
  signIn,
  logOut,
};
