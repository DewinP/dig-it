import authRoute from "./auth.routes";
import communityRoute from "./community.routes";
import userRoute from "./users.routes";
import postRoute from "./post.routes";
import { Router } from "express";

const router = Router();

router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/posts", postRoute);
router.use("/c", communityRoute);

export default router;
