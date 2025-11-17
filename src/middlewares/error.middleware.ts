import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const status = err.status || 500;

    console.error("[ERROR]", {
        message: err.message,
        status,
        path: req.originalUrl,
        stack: err.stack
    });

    return res.status(status).json({
        status: "error",
        code: status,
        message: err.message || "Internal Server Error",
        ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    });
};
