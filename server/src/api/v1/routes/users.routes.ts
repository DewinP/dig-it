import { Router } from "express";
import UserController from "../controllers/UserController";
import { isAuth } from "../validations";

const router = Router();
router.get("/:username", UserController.GetUserByUsername);
router.post("/sub", isAuth, UserController.SubscribeToCommunity);
router.patch("/:username");
router.delete("/:username");

export default router;
