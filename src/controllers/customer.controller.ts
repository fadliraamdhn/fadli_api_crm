import { NextFunction, Request, Response } from "express";
import { getAllCustomersWithServices } from "~/services/customer.service";

export const handleGetCustomers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as any).user;
        const { search } = req.query;

        const customers = await getAllCustomersWithServices(
            user.id,
            user.role,
            search as string
        );

        return res.status(200).json({
            status: "success",
            data: customers,
        });
    } catch (err) {
        next(err);
    }
};