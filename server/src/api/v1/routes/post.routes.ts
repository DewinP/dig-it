import { Router } from "express";
import PostController from "../controllers/PostController";
import { isAuth } from "../validations";
import validatePost from "../validations/post.validator";

const router = Router();

router.get("/", PostController.GetAllPosts);
router.get("/:title", PostController.GetPostByTitle);
router.get("/community/:communityId", PostController.GetCommunityPosts);
router.get("/user/:username", PostController.GetPostByUser);
router.post("/", isAuth, validatePost, PostController.CreatePost);
router.post("/like", isAuth, PostController.LikePost);
router.delete("/like", isAuth, PostController.UnlikePost);
router.patch("/:title");
router.delete("/:title");

export default router;
