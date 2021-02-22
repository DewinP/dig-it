import { Router } from "express";
import UserController from "../controllers/UserController";
const router = Router();
router.get("/:username", UserController.GetUserByUsername);
router.post("/sub", UserController.SubscribeToCommunity);
router.patch("/:username");
router.delete("/:username");

export default router;
