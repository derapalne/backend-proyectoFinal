import { Request, Response } from "express";
import { ProductosService } from "../services";

const service = new ProductosService();

export class ProductosController {
    async getAll(req: Request, res: Response) {
        const user = req.user;
        const productos = await service.getAll();
        res.render("productosList", { productos: productos, user: user, categoria: false });
    }
    async getById(req: Request, res: Response) {
        const id = req.params.id;
        let respuesta = [];
        if (isNaN(Number(id))) {
            respuesta = await service.getByCategory(id);
        } else {
            respuesta[0] = await service.getById(id);
        }
        res.render("productosList", {productos: respuesta, user: req.user, categoria: req.params.id});
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
