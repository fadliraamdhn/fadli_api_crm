import { Router } from "express";
import { handleGetSalesPerformance } from "~/controllers/report.controller";
import { authMiddleware } from "~/middlewares/auth.middleware";
import { authorize } from "~/middlewares/role.middleware";

const router = Router();

router.use(authMiddleware);
router.use(authorize("Manager"));

router.get("/sales-performance", handleGetSalesPerformance);

export default router;
