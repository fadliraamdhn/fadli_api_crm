import { Router } from "express";
import authRoute from "~/routes/auth.route";
import leadRoute from "~/routes/lead.route"
import productRoute from "~/routes/product.route"
import projectRoute from "~/routes/project.route"
import customerRoute from "~/routes/customer.route"

const router = Router();

router.use("/auth", authRoute);
router.use("/leads", leadRoute)
router.use("/product", productRoute)
router.use("/project", projectRoute)
router.use("/customers", customerRoute)

export default router;