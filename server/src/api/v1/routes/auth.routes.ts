import { Router } from "express";
import AuthController from "../controllers/AuthController";
import validateRegister from "../validations/user.validator";

const router = Router();

router.post("/login", AuthController.Login);
router.post("/register", validateRegister, AuthController.Register);
router.get("/me", AuthController.Me);

export default router;
