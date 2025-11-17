import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ message: "Unauthorized" });

    const token = authHeader.split(" ")[1];

    if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET tidak ditemukan di environment");
        return res.status(500).json({ message: "Server misconfiguration" });
    }

    try {
        const decoded = jwt.verify(token as string, process.env.JWT_SECRET);
        (req as any).user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
