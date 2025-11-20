import { Router } from "express";
import { handleGetCustomers } from "~/controllers/customer.controller";
import { authMiddleware } from "~/middlewares/auth.middleware";
import { authorize } from "~/middlewares/role.middleware";

const router = Router();

router.use(authMiddleware);
router.use(authorize("Sales", "Manager"));

router.get("/", handleGetCustomers);

export default router;