import { LEAD_STATUS } from "~/generated/prisma/enums";
import { prisma } from "~/prisma/prisma.client";
import { AppError } from "~/utils/appError";

export const getAllLeads = async (userId: number, role: "Sales" | "Manager", page = 1, limit = 10, status?: LEAD_STATUS) => {
    const leads = await prisma.lead.findMany({
        where: role === "Sales" ? { salesId: userId } : {},
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
    });

    return leads
};

export const createLead = async ( userId: number, role: "Sales" | "Manager", data: { name: string; contact: string; address: string; need: string; status?: LEAD_STATUS}) => {
    const salesId = role === "Sales" ? userId : (data as any).salesId ?? userId;

    const lead = await prisma.lead.create({
        data: {
            name: data.name,
            contact: data.contact,
            address: data.address,
            need: data.need,
            status: data.status,
            sales: {
                connect: { id: salesId },
            },
        },
    });

    return lead;
}

export const updateLead = async ( userId: number, role: "Sales" | "Manager", leadId: number, data: { name?: string; contact?: string; address?: string; need?: string; status?: LEAD_STATUS }) => {

    const lead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) throw new AppError("Lead tidak ditemukan");

    if (role === "Sales" && lead.salesId !== userId) {
        throw new AppError("Anda tidak memiliki akses untuk mengedit lead ini");
    }

    const updatedLead = await prisma.lead.update({
        where: { id: leadId },
        data,
    });

    return updatedLead;
};

export const deleteLead = async ( userId: number, role: "Sales" | "Manager", leadId: number ) => {
    const lead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) throw new AppError("Lead tidak ditemukan");

    if (role === "Sales" && lead.salesId !== userId) {
        throw new AppError("Anda tidak memiliki akses untuk menghapus lead ini");
    }

    await prisma.lead.delete({ where: { id: leadId } });

    return true;
};