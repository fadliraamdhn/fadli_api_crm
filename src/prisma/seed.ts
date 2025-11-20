import { prisma } from "~/prisma/prisma.client";
import bcrypt from "bcryptjs";

// untuk membuat akun baru
const username:string = "sales1"
const userpass:string =  "123456"

async function addNewUser() {
    const hash = await bcrypt.hash(userpass, 10)

    await prisma.user.upsert({
        where: { username },
        update: {},
        create: {
            username,
            password: hash,
            role: "Sales"
        }
    })

    console.log("Akun berhasil dibuat!");
    
}

addNewUser().finally(() => prisma.$disconnect())