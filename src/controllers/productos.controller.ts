import { Request, Response } from "express";
import { ProductosService } from "../services";

const service = new ProductosService();

export class ProductosController {
    async getAll(req: Request, res: Response) {
        try {
            const user = req.user || req.cookies.userInfo.user;
            const productos = await service.getAll();
            res.render("productosList", { productos: productos, user: user, categoria: false });
        } catch (e) {
            res.status(500).render("error", { error: e });
        }
    }
    async getById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            let respuesta = [];
            if (isNaN(Number(id))) {
                respuesta = await service.getByCategory(id);
            } else {
                respuesta[0] = await service.getById(id);
            }
            res.render("productosList", {
                productos: respuesta,
                user: req.user || req.cookies.userInfo.user,
                categoria: req.params.id,
            });
        } catch (e) {
            res.status(500).render("error", { error: e });
        }
    }
    async add(req: Request, res: Response) {
        try {
            const data = req.body.producto;
            res.json(await service.add(data));
        } catch (e) {
            res.status(500).render("error", { error: e });
        }
    }
    async updateById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const data = req.body.producto;
            res.json(await service.updateById(id, data));
        } catch (e) {
            res.status(500).render("error", { error: e });
        }
    }
    async deleteById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            res.json(await service.deleteById(id));
        } catch (e) {
            res.status(500).render("error", { error: e });
        }
    }
}
