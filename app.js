const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const router = require("./router");
const {requireAuth} = require("./middlewares/auth.middleware");

const app = express();

app.use(cors(
  {
    //permet d'accepter d'ajouter des credentials(pour cookies)
    origin:'http://localhost:5173',
    credentials: true 
  }
));
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

// pour accéder aux images
const uploadsPath = path.join(__dirname, "public/uploads/pictures");
app.use("/public/uploads/pictures", express.static(uploadsPath));

const reactBuildPath = path.join(__dirname, "../my-blog-project-front");
app.use(express.static(reactBuildPath));

app.get(
  "*.*",
  express.static(path.join(__dirname, "../public"), { maxAge: "1y" })
);

app.get("*", (_, res) => {
  res.sendFile(path.join(reactBuildPath, "/index.html"));
});

module.exports = app;