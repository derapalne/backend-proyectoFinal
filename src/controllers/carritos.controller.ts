import { Request, Response } from "express";
import { CarritosService } from "../services";
import { logErr } from "../utils";

const service = new CarritosService();

export class CarritosController {
    async getByEmail(req: Request, res: Response) {
        try {
            let email = "";
            if (req.user) email = req.user.email;
            else email = req.cookies.userInfo.user.email;
            let carrito = await service.getByEmail(email);
            if (!carrito) {
                carrito = await service.add(email);
            }
            res.render("carrito", { carrito: carrito });
        } catch (e) {
            logErr.error(e);
            res.status(500).render("error", { error: e });
        }
    }
    async postProducto(req: Request, res: Response) {
        try {
            const idProd = req.body.idProd;
            const email = req.body.email;
            const carritoExiste = await service.getByEmail(email);
            if (!carritoExiste) await service.add(email);
            await service.addProd(email, idProd);
            if (req.body.categoria) {
                res.redirect("/api/productos/" + req.body.categoria);
            } else {
                res.redirect("/api/productos");
            }
        } catch (e) {
            logErr.error(e);
            res.status(500).render("error", { error: e });
        }
    }
    async removeProducto(req: Request, res: Response) {
        try {
            const idProd = req.params.id;
            const email = req.body.email;
            const carrito = await service.removeProd(email, idProd);
            if (typeof carrito != "string") res.render("carrito", { carrito: carrito });
            else res.json(carrito);
        } catch (e) {
            logErr.error(e);
            res.status(500).render("error", { error: e });
        }
    }
}
