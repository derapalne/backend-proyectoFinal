import { NextFunction, Request, Response } from "express";
import { config } from "../utils";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        if(config.IS_ADMIN) {
            return next();
        }
        res.status(403).render("error", {msg: "No está autorizado para acceder a este recurso."})
    } catch (error) {
        res.status(500).json({error: error})
    }
}