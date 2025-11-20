import { NextFunction, Request, Response } from "express";
import { getAllCustomersWithServices } from "~/services/customer.service";

export const handleGetCustomers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as any).user;
        if (!user) return res.status(401).json({ status: "error", message: "Unauthorized" });

        const customers = await getAllCustomersWithServices(user.id, user.role);
        res.status(200).json({
            status: "success",
            code: 200,
            data: customers,
        });
    } catch (error: any) {
        next(error)
    }
};
