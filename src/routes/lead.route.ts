import { Router } from "express";
import { handleCreateLead, handleDeleteLead, handleUpdateLead, hanleGetLeads } from "~/controllers/lead.controller";
import { authMiddleware } from "~/middlewares/auth.middleware";
import { authorize } from "~/middlewares/role.middleware";

const router = Router();

router.use(authMiddleware);
router.use(authorize("Sales", "Manager"));

router.get("/", hanleGetLeads);
router.post("/create-lead", handleCreateLead);
router.patch("/update-lead/:id", handleUpdateLead);
router.delete("/delete-lead/:id", handleDeleteLead);


export default router;