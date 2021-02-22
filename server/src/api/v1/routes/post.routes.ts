import { Router } from "express";
import PostController from "../controllers/PostController";

const router = Router();

router.get("/", PostController.GetAllPosts);
router.get("/:title", PostController.GetPostByTitle);
router.get("/community/:communityId", PostController.GetCommunityPosts);
router.get("/user/:username", PostController.GetPostByUser);
router.post("/", PostController.CreatePost);
router.patch("/:title");
router.delete("/:title");

export default router;
