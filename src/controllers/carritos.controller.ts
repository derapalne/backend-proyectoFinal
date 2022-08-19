import { Request, Response } from "express";
import { CarritosService } from "../services";

const service = new CarritosService();

export class CarritosController {
    async getByEmail(req: Request, res: Response) {
        const email = "req.user.email";
        const response = await service.getByEmail(email);
        if(response) res.json(response);
        else res.json(await service.add(email));
    }
    async postProducto(req: Request, res: Response) {
        const idProd = req.body.idProd;
        const email = "req.user.email";
        res.json(await service.addProd(email, idProd));
    }
    async removeProducto(req: Request, res: Response) {
        const idProd = req.body.idProd;
        const email = "req.user.email";
        res.json(await service.removeProd(email, idProd))
    }
    async method(req: Request, res: Response) {}
}
