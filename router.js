const express = require("express");
const multer = require("multer");
const path = require('path');

const upload = multer({
    storage: multer.memoryStorage(),
});

const router = express.Router();

const authControllers = require("./controllers/authController");
const userControllers = require("./controllers/userControllers");
const articleControllers = require("./controllers/articleControllers");
const uploadControllers = require('./controllers/uploadControllers');

// Identification
router.post("/signUp", authControllers.signUp);
router.post("/signIn", authControllers.signIn);
router.get("/logout", authControllers.logOut);

// Users
router.get("/users", userControllers.getUsers);
router.get("/users/:id", userControllers.getUserInfos);

// Articles
router.post("/articles", upload.single('file'), articleControllers.createArticle);
router.get("/articles", articleControllers.getArticles);
router.get("/articles/:id", articleControllers.getArticleInfos);
router.delete("/articles/:id", articleControllers.deleteArticle);

// Commentaires
router.patch("/articles/:id/comments", articleControllers.addComment);

//likes
router.patch("/articles/:id/add-liker", articleControllers.addLiker);
router.patch("/articles/:id/remove-liker", articleControllers.removeLiker);

//upload profile image
router.post('/upload', upload.single('file'), uploadControllers.uploadProfile);

module.exports = router;