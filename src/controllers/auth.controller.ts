import { Request, Response, NextFunction } from "express";
import { loginUser } from "~/services/auth.service";

export const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body
        const result = await loginUser(username, password)

        return res.status(200).json({
            status: "success",
            code: 200,
            data: result,
            message: "Berhasil login"
        })
    } catch (error: any) {
        next(error)
    }
}