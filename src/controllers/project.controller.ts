import { Request, Response, NextFunction } from "express";
import { addMultipleProducts, editProjectStatus, getAllProject } from "~/services/project.service";
import { AppError } from "~/utils/appError";

export const handleGetProjects = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as any).user;
        const projects = await getAllProject(user?.role === "Sales" ? user.id : undefined);

        res.status(200).json({
            status: "success",
            code: 200,
            data: projects,
        });
    } catch (err) {
        next(err);
    }
};

export const addProductsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { projectId, products } = req.body;
        const result = await addMultipleProducts(projectId, products);
        res.status(200).json({ status: "success", code: 201, data: result, message: "Berhasil tambah produk" });
    } catch (err: any) {
        next(err)
    }
};

export const handleEditStatus = async (req: Request, res: Response, next: NextFunction) => {
    const { projectId, status } = req.body;

    if (!projectId || !status) {
        return new AppError("Belum ada deal", 403)
    }

    try {
        const updatedProject = await editProjectStatus(projectId, status);
        return res.status(200).json({ status: "Success", code: 200, message: "Berhasil update status", data: updatedProject });
    } catch (err: any) {
        next(err)
    }
};