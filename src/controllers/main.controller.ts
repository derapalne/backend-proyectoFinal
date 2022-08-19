import { Request, Response } from "express";

export class MainController {

    async getMain(req: Request, res: Response) {
        res.redirect("/api/productos");
    }

}