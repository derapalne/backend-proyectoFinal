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
            await sendOrderMail(orden);
            res.status(201).redirect("/ordenes");
        } catch (e) {
            logErr.error(e);
            res.status(500).render("error", { error: e });
        }
    }
    async getOrdenesView(req: Request, res: Response) {
        try {
            let email = "";
            if (req.user) email = req.user.email;
            else email = req.cookies.userInfo.user.email;
            res.status(200).render("ordenes", { ordenes: await service.getByEmail(email) });
        } catch (e) {
            logErr.error(e);
            res.status(500).render("error", { error: e });
        }
    }
    async getOrdenesApi(req: Request, res: Response) {
        try {
            let email = "";
            if (req.user) email = req.user.email;
            else email = req.cookies.userInfo.user.email;
            res.status(200).json({ ordenes: await service.getByEmail(email) });
        } catch (e) {
            logErr.error(e);
            res.status(500).render("error", { error: e });
        }
    }
    async updateOrden(req: Request, res: Response) {
        try {
            let email = "";
            if (req.user) email = req.user.email;
            else if (req.cookies.userInfo) email = req.cookies.userInfo.user.email;
            const estado = req.body.estado;
            const id = req.body.id;
            const orden = await service.updateEstadoById(Number(id), estado);
            res.json(await orden);
        } catch (e) {
            logErr.error(e);
            res.status(500).render("error", { error: e });
        }
    }
}
