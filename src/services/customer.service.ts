import { prisma } from "~/prisma/prisma.client";

export const getAllCustomersWithServices = async (
    salesId: number,
    role: string,
    search?: string
) => {
    const where: any = role === "Sales" ? { salesId } : {};

    if (search) {
        where.name = {
            contains: search,
            mode: "insensitive",
        };
    }

    const customers = await prisma.customer.findMany({
        where,
        include: {
            sales: {
                select: { username: true }
            },
            customerService: {
                include: {
                    product: true,
                    project: true,
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });

    return customers;
};
