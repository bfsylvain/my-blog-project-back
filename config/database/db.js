const mongoose = require("mongoose");
const dbUserPass = process.env.DB_USER_PASS

mongoose
  .connect("mongodb+srv://"+ dbUserPass +"@cluster0.6nwmsuq.mongodb.net/myblogdb")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));
