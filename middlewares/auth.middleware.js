const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  // Pas de token, accès refusé
  if (!token) {
    res.locals.user = null;
    return res.status(401).json({ error: "Vous n'êtes pas connecté" });
  }
  // Si un token invalide, accès refusé
  jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
    if (err) {
      res.locals.user = null;
      res.cookie("jwt", "", { maxAge: 1 });
      return res.status(401).json({ error: err.message });
    }
    console.log(decodedToken.id)
    const user = await userModel.findById(decodedToken.id.id);
    res.locals.user = user;
    next();
  });
};

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(401).send("Unauthorized");
      } else {
        res.locals.user = { id: decodedToken.id };
        next();
      }
    });
  } else {
    return res.status(401).json({ error: "Pas de token" });
  }
};

module.exports = { checkUser, requireAuth };
