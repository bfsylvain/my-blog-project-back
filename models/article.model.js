const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    userPseudo: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: false,
      maxLength: 55,
      unique: true,
      trim: true,
    },
    pictures: {
      type: [String],
      default: "/public/uploads/pictures/random-picture.jpg",
    },
    text: {
      type: String,
      trim: true,
      maxLength: 100000,
    },
    likers: {
      type: [String],
      required: true,
    },
    comments: {
      type: [
        {
          userId: String,
          userPseudo: String,
          text: String,
          timestamp: Number,
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const articleModel = mongoose.model("article", articleSchema);
module.exports = articleModel;
