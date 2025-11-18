import { prisma } from "~/prisma/prisma.client"
import { AppError } from "~/utils/appError"

export const getAllProduct = async () => {
    const result = await prisma.product.findMany({
        orderBy: { createdAt: "desc" }
    })

    return result
}

export const createProduct = async (data: { name: string; hpp: number; marginSales: number }) => {
    const sellingPrice = Math.round(data.hpp + (data.hpp * data.marginSales) / 100)

    const result = await prisma.product.create({
        data: {
            name: data.name,
            hpp: data.hpp,
            marginSales: data.marginSales,
            sellingPrice
        }
    })

    return result
}

export const updateProduct = async ( productId: number, data: { name?: string; hpp?: number; marginSales?: number }) => {
    let updatedData: any = { ...data }

    if (data.hpp !== undefined || data.marginSales !== undefined) {
        const product = await prisma.product.findUnique({ where: { id: productId }})
        if (!product) throw new AppError("Produk tidak ditemukan", 404)
        
        const hpp = data.hpp ?? product.hpp
        const marginSales = data.marginSales ?? product. marginSales

        updatedData.sellingPrice = Math.round(hpp + (hpp * marginSales) / 100);
    }

    const result = await prisma.product.update({
        where: { id: productId },
        data: updatedData
    })

    return result
}

export const deleteProduct = async (productId: number) => {
    return await prisma.product.delete({ where: { id: productId } });
};