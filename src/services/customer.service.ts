import { prisma } from "~/prisma/prisma.client";

export const getAllCustomersWithServices = async (salesId: number, role: string) => {
    const where = role === "Sales" ? { salesId: salesId } : {};

    const customers = await prisma.customer.findMany({
        where,
        include: {
            sales: {
              select: {
                username: true
              }  
            },
            customerService: {
                include: {
                    product: true,
                    project: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return customers;
};
