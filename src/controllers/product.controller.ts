import { Request, Response, NextFunction } from "express";
import { createProduct, updateProduct, deleteProduct, getAllProduct } from "~/services/product.service";

export const handleGetProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await getAllProduct();
        res.status(200).json({ status: "success", code: 200, data: products });
    } catch (err) {
        next(err);
    }
};

export const handleCreateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, hpp, marginSales } = req.body;
        const product = await createProduct({ name, hpp, marginSales });
        res.status(201).json({ status: "success", code: 201, data: product, message: "berhasil buat produk" });
    } catch (err) {
        next(err);
    }
};

export const handleUpdateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = Number(req.params.id);
        const { name, hpp, marginSales } = req.body;
        const product = await updateProduct(productId, { name, hpp, marginSales });
        res.status(200).json({ status: "success", code: 200, data: product, message: "berhasil ubah produk" });
    } catch (err) {
        next(err);
    }
};

export const handleDeleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = Number(req.params.id);
        await deleteProduct(productId);
        res.status(200).json({ status: "success", code: 204, message: "berhasil hapus produk" });
    } catch (err) {
        next(err);
    }
};
