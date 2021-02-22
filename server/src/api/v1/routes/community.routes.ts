import { Router } from "express";
import CommunityController from "../controllers/CommunityController";

const router = Router();

router.get("/", CommunityController.GetAllCommunities);
router.post("/", CommunityController.CreateCommunity);
router.get("/:name", CommunityController.GetCommunity);
router.patch("/:name");
router.delete("/:name");

export default router;
