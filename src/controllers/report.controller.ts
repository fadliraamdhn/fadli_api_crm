import { NextFunction, Request, Response } from "express";
import { getSalesPerformance } from "~/services/reports.service";

export const handleGetSalesPerformance = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { from, to, statusLead, statusProject } = req.query;

        const performance = await getSalesPerformance({
            from: from as string | undefined,
            to: to as string | undefined,
            statusLead: statusLead as "New" | "Converted" | "Closed" | undefined,
            statusProject: statusProject as "approval" | "approved" | "rejected" | undefined,
        });

        res.status(200).json({
            status: "success",
            code: 200,
            data: performance,
        });
    } catch (err: any) {
        next(err)
    }
};
