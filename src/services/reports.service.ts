import { prisma } from "~/prisma/prisma.client";

interface SalesPerformanceFilter {
    from?: string;
    to?: string;
    statusLead?: "New" | "Converted" | "Closed";
    statusProject?: "approval" | "approved" | "rejected";
}

export const getSalesPerformance = async (filter: SalesPerformanceFilter = {}) => {
    const { from, to, statusLead, statusProject } = filter;

    const salesUsers = await prisma.user.findMany({
        where: { role: "Sales" },
        include: {
        leads: {
            where: {
            ...(statusLead ? { status: statusLead } : {}),
            ...(from || to
                ? {
                    createdAt: {
                    ...(from ? { gte: new Date(from) } : {}),
                    ...(to ? { lte: new Date(to) } : {}),
                    },
                }
                : {}),
            },
        },
        projects: {
            where: {
            ...(statusProject ? { status: statusProject } : {}),
            ...(from || to
                ? {
                    createdAt: {
                    ...(from ? { gte: new Date(from) } : {}),
                    ...(to ? { lte: new Date(to) } : {}),
                    },
                }
                : {}),
            },
            include: {
            products: true,
            },
        },
        },
    });

    const performance = salesUsers.map((s) => {
        const totalLead = s.leads.length;
        const totalLeadConverted = s.leads.filter((l) => l.status === "Converted").length;
        const totalProjectApproved = s.projects.filter((p) => p.status === "approved").length;
        const totalRevenue = s.projects
        .map((p) => p.products.reduce((sum, dp) => sum + dp.negotiatedPrice, 0))
        .reduce((a, b) => a + b, 0);

        return {
            salesId: s.id,
            salesName: s.username,
            totalLead,
            totalLeadConverted,
            totalProjectApproved,
            totalRevenue,
        };
    });

    return performance;
};
