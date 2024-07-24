const userManager = require("../managers/UserManager");
const userModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

const UserManager = new userManager();

const getUsers = async (_, res) => {
  try {
    const userList = await UserManager.findAll();
    res.json(userList);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const getUserInfos = async (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(400).send(`ID unknown : ${id}`);
  }
  try {
    const userInfos = await UserManager.findById(id);
    res.status(200).send(userInfos);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  getUsers,
  getUserInfos,
};
