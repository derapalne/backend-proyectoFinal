import { Request, Response } from "express";
import { OrdenesService } from "../services";
import { sendOrderMail } from "../utils";

const service = new OrdenesService();

export class OrdenesController {
    async postOrden(req: Request, res: Response) {
        try {
            const email = req.body.email;
            const orden = await service.add(email);
            console.log(orden);
            await sendOrderMail(orden);
            res.redirect("/api/ordenes");
        } catch (e) {
            res.status(500).render("error", { error: e });
        }

    }
    async getOrdenes(req: Request, res: Response) {
        try {
            let email = "";
            if(req.user) email = req.user.email ;
            else email = req.cookies.userInfo.user.email;
            res.render("ordenes", {ordenes: await service.getByEmail(email)});
        } catch (e) {
            res.status(500).render("error", { error: e });
        }

    }
}