import { Request, Response } from "express";
import { OrdenesService } from "../services";

const service = new OrdenesService();

export class OrdenesController {
    async postOrden(req: Request, res: Response) {
        const email = req.body.email;
        const orden = await service.add(email);
        res.redirect("/api/ordenes");
    }
    async getOrdenes(req: Request, res: Response) {
        const email = req.user.email;
        res.render("ordenes", {ordenes: await service.getByEmail(email)});
    }
}