import { Router } from "express";
import { authMiddleware } from "~/middlewares/auth.middleware";
import authRoute from "~/routes/auth.route";
import leadRoute from "~/routes/lead.route"

const router = Router();

router.use("/auth", authRoute);
router.use("/leads", leadRoute)

export default router;