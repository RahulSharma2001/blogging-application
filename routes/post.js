const express = require("express");
const postController = require("../controllers/post");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
router.get("/posts", authMiddleware, postController.allPost);
router.post("/posts", authMiddleware, postController.addPost);
router.get("/posts/:id", postController.getPostId);
router.put("/posts/:id", authMiddleware, postController.updatePostId);
router.delete("/posts/:id", authMiddleware, postController.deletePostId);

router.post("/comments/:userId", authMiddleware, postController.addComment);
router.put(
  "/comments/:userId/:commentId",
  authMiddleware,
  postController.updateComment
);

router.delete(
  "/comments/:userId/:commentId",
  authMiddleware,
  postController.deleteComment
);

module.exports = router;
