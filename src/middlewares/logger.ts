import morgan from "morgan";
import { Request, Response } from "express";

morgan.token("body", (req: Request) => JSON.stringify(req.body));

export const logger = morgan(
    ':method :url :status :response-time ms - body :body'
);