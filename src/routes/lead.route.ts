import { Router } from "express";
import { handleConvertLead, handleCreateLead, handleDeleteLead, handleUpdateLead, handleGetLeads } from "~/controllers/lead.controller";
import { authMiddleware } from "~/middlewares/auth.middleware";
import { authorize } from "~/middlewares/role.middleware";

const router = Router();

router.use(authMiddleware);
router.use(authorize("Sales", "Manager"));

router.get("/", handleGetLeads);
router.post("/create-lead", handleCreateLead);
router.patch("/update-lead/:id", handleUpdateLead);
router.delete("/delete-lead/:id", handleDeleteLead);

router.post("/convert-lead/:id", handleConvertLead);

export default router;