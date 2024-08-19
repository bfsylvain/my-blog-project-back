const express = require("express");
const multer = require("multer");
// const path = require('path');

const upload = multer({
    storage: multer.memoryStorage(),
});

const router = express.Router();

const authMiddleware = require("./middlewares/auth.middleware")
const authControllers = require("./controllers/authController");
const userControllers = require("./controllers/userControllers");
const articleControllers = require("./controllers/articleControllers");
const uploadControllers = require('./controllers/uploadControllers');

// Identification
router.post("/signUp", authControllers.signUp);
router.post("/signIn", authControllers.signIn);
router.get("/logOut", authControllers.logOut);

// Users
router.get("/users", userControllers.getUsers);
router.get("/users/:id", userControllers.getUserInfos);

// Articles
router.get("/articles", articleControllers.getArticles);
router.post("/articles", authMiddleware.checkUser, upload.single('file'), articleControllers.createArticle);
router.get("/articles/:id", articleControllers.getArticleInfos);
router.delete("/articles/:id", articleControllers.deleteArticle);
// Commentaires
router.patch("/articles/:id/comments", authMiddleware.checkUser, articleControllers.addComment);

//likes
router.patch("/articles/:id/add-liker",authMiddleware.checkUser, articleControllers.addLiker);
router.patch("/articles/:id/remove-liker",authMiddleware.checkUser, articleControllers.removeLiker);

//upload profile image
router.post('/upload', upload.single('file'), uploadControllers.uploadProfile);

module.exports = router;