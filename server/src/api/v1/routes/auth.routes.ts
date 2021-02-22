import { Router } from "express";
import AuthController from "../controllers/AuthController";

const router = Router();

router.post("/login", AuthController.Login);
router.post("/register", AuthController.Register);
router.get("/me", AuthController.Me);

export default router;
