import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config, logger } from "../utils";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (config.AUTH_MODE == "passport") {
            if (req.isAuthenticated()) {
                return next();
            }
            return res
                .status(403)
                .render("login", { msg: "No autorizado! Por favor logueate para continuar" });
        } else if (config.AUTH_MODE == "jwt") {
            const userInfo = req.cookies.userInfo;
            if (!userInfo) {
                return res
                    .status(403)
                    .render("login", { msg: "No autorizado! Por favor logueate para continuar" });
            }
            const token = userInfo.token;

            jwt.verify(token, config.SECRET, (err, decoded) => {
                if (err) {
                    return res.status(403).render("login", {
                        msg: "No autorizado! Por favor logueate para continuar",
                    });
                }
                req.user = (<any>decoded).data;
                next();
            });
        } else {
            return res.status(500).render("error", {
                msg: "No se ha proporcionado un método de autenticacion. Por favor configure la variable de entorno",
            });
        }
    } catch (error) {
        res.status(500).render("error", { msg: error });
    }
};
