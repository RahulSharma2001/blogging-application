const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    comments: [
      {
        comment: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: new Date(),
        },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "auth",
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const PostModel = new mongoose.model("posts", postSchema);

module.exports = PostModel;
