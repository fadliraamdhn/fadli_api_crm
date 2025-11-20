import { LEAD_STATUS, PROJECT_STATUS } from "~/generated/prisma/enums";
import { prisma } from "~/prisma/prisma.client";
import { AppError } from "~/utils/appError";

export const getAllLeads = async (userId: number, role: "Sales" | "Manager", status?: LEAD_STATUS, search?: string) => {
    const leads = await prisma.lead.findMany({
        where: {
            ...(role === "Sales" ? { salesId: userId } : {}),
            ...(status ? { status } : {}),
            ...(search
                ? {
                      name: {
                          contains: search,
                          mode: "insensitive",
                      },
                  }
                : {}),
        },
        orderBy: { createdAt: "desc" },
    });

    return leads;
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
    if (!lead) throw new AppError("Lead tidak ditemukan", 404);

    if (role === "Sales" && lead.salesId !== userId) {
        throw new AppError("Anda tidak memiliki akses untuk menghapus lead ini", 403);
    }

    await prisma.lead.delete({ where: { id: leadId } });

    return true;
};

export const convertLead = async (userId: number,  role: "Sales" | "Manager", leadId: number ) => {
    const lead = await prisma.lead.findUnique({
        where: { id: leadId }
    })

    if(!lead) throw new AppError('Lead tidak ditemukan', 404)

    if (role === "Sales" && lead.salesId !== userId) {
        throw new AppError("Anda tidak memiliki akses untuk mengconvert lead ini");
    }

    const project = await prisma.project.create({
    data: {
        salesId: lead.salesId,
        leadId: lead.id,
        status: PROJECT_STATUS.approval
        },
    });

    await prisma.lead.update({
        where: { id: leadId },
        data: { status: LEAD_STATUS.Converted }
    })

    return project
}
