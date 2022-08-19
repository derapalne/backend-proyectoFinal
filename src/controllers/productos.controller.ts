import { Request, Response } from "express";
import { ProductosService } from "../services";

const service = new ProductosService();

export class ProductosController {
    async getAll(req: Request, res: Response) {
        const productos = await service.getAll();
        res.render("productosList", { productos: productos });
    }
    async getById(req: Request, res: Response) {
        const id = req.params.id;
        if (isNaN(Number(id))) res.json(await service.getByCategory(id));
        else res.json(await service.getById(id));
    }
    async add(req: Request, res: Response) {
        const data = req.body.producto;
        res.json(await service.add(data));
    }
    async updateById(req: Request, res: Response) {
        const id = req.params.id;
        const data = req.body.producto;
        res.json(await service.updateById(id, data));
    }
    async deleteById(req: Request, res: Response) {
        const id = req.params.id;
        res.json(await service.deleteById(id));
    }
}
