import { Request, Response } from "express";
import { ProductosService } from "../services";

const service = new ProductosService();

export class ProductosController {
    getById(req: Request, res: Response) {
        const id = req.params.id;
        res.json(service.getById(id));
    }
    add(req: Request, res: Response) {
        const data = req.body;
        res.json(service.add(data));
    }
    updateById(req: Request, res: Response) {
        const id = req.params.id;
        const data = req.body;
        res.json(service.updateById(id, data));
    }
    deleteById(req: Request, res: Response) {
        const id = req.params.id;
        res.json(service.deleteById(id));
    }
}
