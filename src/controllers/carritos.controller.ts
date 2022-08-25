import { Request, Response } from "express";
import { CarritosService } from "../services";

const service = new CarritosService();

export class CarritosController {
    async getByEmail(req: Request, res: Response) {
        const email = req.user.email;
        let carrito = await service.getByEmail(email);
        if (!carrito) {
            carrito = await service.add(email);
        }
        res.render("carrito", { carrito: carrito });
    }
    async postProducto(req: Request, res: Response) {
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
    }
    async removeProducto(req: Request, res: Response) {
        try {
            const idProd = req.params.id;
            const email = req.body.email;
            const carrito = await service.removeProd(email, idProd);
            if (typeof carrito != "string") res.render("carrito", { carrito: carrito });
            else res.json(carrito);
        } catch (error) {
            // retornar pagina de error
        }
    }
    async method(req: Request, res: Response) {}
}
