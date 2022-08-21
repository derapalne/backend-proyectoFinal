import { NextFunction, Request, Response } from "express";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        console.log("hola no autenticado");
        res.status(403).redirect("/login");
    }
};
