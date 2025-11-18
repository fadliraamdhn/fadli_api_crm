import { Router } from "express";
import { handleCreateProduct, handleDeleteProduct, handleGetProducts, handleUpdateProduct } from "~/controllers/product.controller";
import { authMiddleware } from "~/middlewares/auth.middleware";
import { authorize } from "~/middlewares/role.middleware";

const router = Router();

router.get("/", authMiddleware, authorize("Sales", "Manager"), handleGetProducts);

router.post("/create-product", authMiddleware, authorize("Manager"), handleCreateProduct);
router.patch("/update-product/:id", authMiddleware, authorize("Manager"), handleUpdateProduct);
router.delete("/delete-product/:id", authMiddleware, authorize("Manager"), handleDeleteProduct);

export default router;