import morgan from "morgan";
import { Request } from "express";

morgan.token("body", (req: Request) => {
    if (!req.body) return "";
    const bodyCopy = { ...req.body };
    
    if (bodyCopy.password) bodyCopy.password = "***";
    
    return JSON.stringify(bodyCopy);
});

export const logger = morgan(
    ":method :url :status :response-time ms - body :body"
);
