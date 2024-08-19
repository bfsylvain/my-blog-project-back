const fs = require("fs");
const path = require("path");
const ObjectID = require("mongoose").Types.ObjectId;
const { v4: uuidv4 } = require("uuid");
const articleManagers = require("../managers/ArticleManager");
const articleModel = require("../models/article.model");

const ArticleManager = new articleManagers();

const createArticle = async (req, res) => {
  let fileName;
  const validMimeTypes = ["image/jpg", "image/jpeg", "image/png"];

  try {
    if (req.file) {
      if (!validMimeTypes.includes(req.file.mimetype)) {
        throw new Error("invalid file type");
      }

      if (req.file.size > 5000000) throw Error("file oversize");

      fileName = `${uuidv4()}.jpg`;
      const filePath = path.join(
        __dirname,
        "../public/uploads/pictures",
        fileName
      );

      fs.writeFile(filePath, req.file.buffer, (err) => {
        if (err) {
          throw new Error("Error writing file");
        }
      });
    }
    const newArticle = new articleModel({
      userId: req.body.userId,
      userPseudo: req.body.userPseudo,
      title: req.body.title,
      text: req.body.text,
      pictures: req.file ? [`/uploads/pictures/${fileName}`] : ["/uploads/pictures/random-picture-3.jpg"],
      likers: [],
      comments: [],
    });
    const postArticle = await ArticleManager.create(newArticle);
    res.status(201).json(postArticle);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const getArticles = async (_, res) => {
  try {
    const articleList = await ArticleManager.findAll();
    res.json(articleList);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const getArticleInfos = async (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(400).send(`ID unknown : ${req.params.id}`);
  }
  try {
    const articleInfos = await ArticleManager.findById(id);
    res.status(200).send(articleInfos);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const addComment = async (req, res) => {
  const articleId = req.params.id;
  const comment = {
    userId: req.body.userId,
    userPseudo: req.body.userPseudo,
    text: req.body.text,
    timestamp: Date.now(),
  };
  if (!ObjectID.isValid(articleId))
    return res.status(400).send(`ID unknown : ${articleId}`);
  try {
    const UpdatedArticle = await ArticleManager.addComment(articleId, comment);
    res.status(200).send(UpdatedArticle);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const addLiker = async (req, res) => {
  const articleId = req.params.id;
  const likerId = req.body.userId;

  if (!ObjectID.isValid(articleId))
    return res.status(400).send(`ID unknown : ${articleId}`);
  try {
    const updatedLikers = await ArticleManager.addLiker(articleId, likerId);
    res.status(200).send(updatedLikers);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const removeLiker = async (req, res) => {
  const articleId = req.params.id;
  const likerId = req.body.userId;

  if (!ObjectID.isValid(articleId))
    return res.status(400).send(`ID unknown : ${articleId}`);
  try {
    const updatedLikers = await ArticleManager.removeLiker(articleId, likerId);
    res.status(200).send(updatedLikers);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};


const deleteArticle = async (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send(`ID unknown : ${req.params.id}`);
  try {
    await ArticleManager.delete(id);
    res.status(200).send("Article deleted");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  createArticle,
  getArticles,
  getArticleInfos,
  addComment,
  addLiker,
  removeLiker,
  deleteArticle,
};
