import { Request, Response, NextFunction } from "express";
import { LEAD_STATUS } from "~/generated/prisma/enums";
import { convertLead, createLead, deleteLead, getAllLeads, updateLead } from "~/services/leads.service";

export const handleGetLeads = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page, limit, status, search } = req.query;
        const user = (req as any).user;

        const leads = await getAllLeads(
            user.id,
            user.role,
            status as LEAD_STATUS,
            search as string
        );

        return res.status(200).json({
            status: "success",
            code: 200,
            data: leads,
        });
    } catch (err) {
        next(err);
    }
};

export const handleCreateLead = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as any).user;
        const { name, contact, address, need, status } = req.body;

        const lead = await createLead(user.id, user.role, {
            name,
            contact,
            address,
            need,
            status: status as LEAD_STATUS,
        });

        return res.status(201).json({
            status: "success",
            code: 201,
            data: lead,
            message: "Berhasil buat calon pelanggan"
        });
    } catch (err) {
        next(err);
    }
}

export const handleUpdateLead = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as any).user;
        const leadId = Number(req.params.id);
        const { name, contact, address, need, status } = req.body;

        const lead = await updateLead(user.id, user.role, leadId, {
            name,
            contact,
            address,
            need,
            status: status as LEAD_STATUS,
        });

        return res.status(200).json({
            status: "success",
            code: 200,
            data: lead,
            message: "Berhasil update data calon pelanggan"
        });
    } catch (err) {
        next(err);
    }
}

export const handleDeleteLead = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as any).user;
        const leadId = Number(req.params.id);

        await deleteLead(user.id, user.role, leadId);

        return res.status(200).json({
            status: "success",
            code: 200,
            message: "Calon pelanggan berhasil dihapus",
        });
    } catch (err) {
        next(err);
    }
};

export const handleConvertLead = async (req: Request, res: Response, next: NextFunction) => {
    const leadId = Number(req.params.id);
    const userId = req.user!.id;
    const role = req.user!.role;

    try {
        const project = await convertLead(userId, role, leadId);
        res.status(200).json({ status: "success", code: 200, message: "Calon pelanggan berhasil dipindahkan", project });
    } catch (err: any) {
        next(err)
    }
};