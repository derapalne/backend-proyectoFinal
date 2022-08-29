import { Request, Response } from "express";
import { OrdenesService } from "../services";
import { logger, sendOrderMail } from "../utils";
import { logErr } from "../utils";

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
            logErr.error(e);
            res.status(500).render("error", { error: e });
        }
    }
    async getOrdenes(req: Request, res: Response) {
        try {
            let email = "";
            if (req.user) email = req.user.email;
            else email = req.cookies.userInfo.user.email;
            res.render("ordenes", { ordenes: await service.getByEmail(email) });
        } catch (e) {
            logErr.error(e);
            res.status(500).render("error", { error: e });
        }
    }

    async updateOrden(req: Request, res: Response) {
        try {
            let email = "";
            if (req.user) email = req.user.email;
            else email = req.cookies.userInfo.user.email;
            const estado = req.body.estado;
            const id = req.body.id;
            logger.trace({email, estado, id});
            const orden = await service.updateEstadoById(id, estado);
            logger.trace(orden);
            res.redirect("/api/ordenes/");
        } catch (e) {
            logErr.error(e);
            res.status(500).render("error", { error: e });
        }
    }
}
