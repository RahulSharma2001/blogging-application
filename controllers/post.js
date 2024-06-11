const PostModel = require("../models/post");

const allPost = async (req, res) => {
  const allPosts = await PostModel.find().populate("userId");
  res.json({
    message: "all posts ",
    Data: allPosts,
  });
};

const addPost = async (req, res) => {
  const newPost = new PostModel({ ...req.body, userId: req.user._id });

  const newPostAdded = await newPost.save();
  res.json({
    message: "add posts api",
    post: newPostAdded,
  });
};

const getPostId = async (req, res) => {
  const id = req.params.id;
  const data = await PostModel.findById(id);
  if (!data) {
    res.json({
      message: "Enter Valid ID",
    });
  }
  res.json({
    result: data,
  });
};

const updatePostId = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedPost = await PostModel.findByIdAndUpdate(id, req.body);
    res.json({
      message: updatedPost,
    });
  } catch (e) {
    res.json({
      message: "Something went wrong, Try again",
    });
  }
};

const deletePostId = async (req, res) => {
  const id = req.params.id;
  const deletedPost = await PostModel.findByIdAndDelete(id);
  res.json({
    message: "Deleted SuccessFully",
  });
};

const addComment = async (req, res) => {
  const post_id = req.params.userId;

  const comment = {
    comment: req.body.comment,
    userId: req.user._id,
  };
  try {
    await PostModel.findByIdAndUpdate(post_id, {
      $push: { comments: comment },
    });
    res.json({
      message: "Comment Added SuccessFully",
    });
  } catch (e) {
    res.json({
      message: "Something went wrong",
    });
  }
};

const updateComment = async (req, res) => {
  const post_id = req.params.userId;
  const commentId = req.params.commentId;

  const newCommentText = req.body.newComment;
  try {
    await PostModel.findOneAndUpdate(
      { _id: post_id, "comments._id": commentId },
      { $set: { "comments.$.comment": newCommentText } },
      { new: true }
    );
    res.json({
      message: "Comment Updated SuccessFully",
    });
  } catch (e) {
    res.json({
      message: "Something went wrong" + e,
    });
  }
};

const deleteComment = async (req, res) => {
  const post_id = req.params.userId;
  const commentId = req.params.commentId;
  try {
    await PostModel.findByIdAndUpdate(
      post_id,
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );
    res.json({
      message: "Comment Deleted SuccessFully",
    });
  } catch (e) {
    res.json({
      message: "Something went wrong" + e,
    });
  }
};

const postController = {
  addPost,
  getPostId,
  deletePostId,
  updatePostId,
  allPost,
  addComment,
  updateComment,
  deleteComment,
};

module.exports = postController;
