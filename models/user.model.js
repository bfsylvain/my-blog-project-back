const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  pseudo: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    validate: [isEmail],
    lowercase: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    minlength: 6,
  },
  avatar: {
    type: String,
    default: "/public/uploads/pictures/random-picture.png",
  },
  likes: {
    type: [String],
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Email incorrect");
  }

  const isMatch = await bcrypt.compare(password.toString(), user.password);

  if (!isMatch) {
    throw new Error("Mot de passe incorrect");
  }
  return user;
};

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
