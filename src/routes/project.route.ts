import { Router } from "express";
import { addProductsController, handleEditStatus, handleGetProjects } from "~/controllers/project.controller";
import { authMiddleware } from "~/middlewares/auth.middleware";
import { authorize } from "~/middlewares/role.middleware";

const router = Router();

router.use(authMiddleware);
router.use(authorize("Sales", "Manager"));

router.get("/", handleGetProjects);
router.post("/add-products", addProductsController);
router.patch("/status", authMiddleware, authorize("Manager"), handleEditStatus);

export default router;