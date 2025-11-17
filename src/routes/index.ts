import { Router } from "express";
import { authMiddleware } from "~/middlewares/auth.middleware";
import authRoute from "~/routes/auth.route";

const router = Router();

router.use("/auth", authRoute);

export default router;