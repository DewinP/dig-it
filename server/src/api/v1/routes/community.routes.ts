import { Router } from "express";
import CommunityController from "../controllers/CommunityController";
import { isAuth } from "../validations";

const router = Router();

router.get("/", CommunityController.GetAllCommunities);
router.post("/", isAuth, CommunityController.CreateCommunity);
router.get("/:name", CommunityController.GetCommunity);
router.patch("/:name", isAuth);
router.delete("/:name", isAuth);

export default router;
