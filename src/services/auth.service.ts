import bcrypt from "bcryptjs"
import { prisma } from "~/prisma/prisma.client"
import jwt from "jsonwebtoken";
import { AppError } from "~/utils/appError";

export const loginUser = async (username: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: { username },
    })

    if (!user) throw new AppError("User tidak ditemukan", 404)

    const match = await bcrypt.compare(password, user.password)

    if (!match) throw new AppError('username atau password salah', 401)

    const token = jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        process.env.JWT_SECRET!,
        { expiresIn: '1d'}
    )
    
    const { password: _, ...safeUser } = user;

    return { token, user: safeUser }
}