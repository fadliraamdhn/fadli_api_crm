import { Customer, DealProduct } from "~/generated/prisma/client"
import { PROJECT_STATUS } from "~/generated/prisma/enums"
import { prisma } from "~/prisma/prisma.client"
import { AppError } from "~/utils/appError"

export const getAllProject = async (salesId: number) => {
    const project = await prisma.project.findMany({
        where: salesId ? { salesId } : {},
        include: {
            lead: true,
            products: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return project
}

export type DealProductDTO = {
  productId: number;
  negotiatedPrice: number;
};

export const addMultipleProducts = async (projectId: number, products: DealProductDTO[]) => {
    return await prisma.$transaction(async (tx) => {
        const project = await tx.project.findUnique({
            where: { id: projectId },
            include: { lead: true },
        });
        if (!project) throw new AppError("Project not found");

        let needApproval = false;
        const createdDeals: DealProduct[] = [];

        for (const p of products) {
            const product = await tx.product.findUnique({ where: { id: p.productId } });
            if (!product) throw new AppError(`Produk tidak ditemukan`, 404);

            const deal = await tx.dealProduct.create({
                data: { projectId, productId: p.productId, negotiatedPrice: p.negotiatedPrice },
            });
            createdDeals.push(deal);

            if (p.negotiatedPrice < product.sellingPrice) {
                needApproval = true;
            }
        }

        const status = needApproval ? PROJECT_STATUS.approval : PROJECT_STATUS.approved;

        await tx.project.update({ where: { id: projectId }, data: { status } });

        let createdCustomer = null;

        if (!needApproval) {
            createdCustomer = await tx.customer.create({
                data: {
                    name: project.lead.name,
                    contact: project.lead.contact,
                    address: project.lead.address,
                    salesId: project.salesId,
                },
            });

            for (const deal of createdDeals) {
                await tx.customerService.create({
                    data: {
                        customerId: createdCustomer.id,
                        productId: deal.productId,
                        projectId: project.id,
                    },
                });
            }
        }

        return { deals: createdDeals, status, customer: createdCustomer };
    });
};

export const editProjectStatus = async (projectId: number, status: PROJECT_STATUS) => {
    return await prisma.$transaction(async (tx) => {
        const project = await tx.project.findUnique({
            where: { id: projectId },
            include: { lead: true, products: true },
        });

        if (!project) throw new AppError("Project not found", 404);

        if (status === PROJECT_STATUS.approved && project.products.length === 0) {
            throw new AppError("Pelanggan tidak punya deal", 404);
        }

        const updatedProject = await tx.project.update({
            where: { id: projectId },
            data: { status },
        });

        let createdCustomer = null;

        if (status === PROJECT_STATUS.approved) {
            createdCustomer = await tx.customer.create({
                data: {
                    name: project.lead.name,
                    contact: project.lead.contact,
                    address: project.lead.address,
                    salesId: project.salesId,
                },
            });

            for (const deal of project.products) {
                await tx.customerService.create({
                    data: {
                        customerId: createdCustomer.id,
                        productId: deal.productId,
                        projectId: project.id,
                    },
                });
            }
        }

        return { project: updatedProject, customer: createdCustomer };
    });
};