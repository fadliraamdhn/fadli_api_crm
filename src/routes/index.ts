import { Router } from "express";
import authRoute from "~/routes/auth.route";
import leadRoute from "~/routes/lead.route"
import productRoute from "~/routes/product.route"

const router = Router();

router.use("/auth", authRoute);
router.use("/leads", leadRoute)
router.use("/product", productRoute)

export default router;