import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    console.log("autenticando...");
    if (req.isAuthenticated()) {
        console.log("NO AUTENTICADO");
        return next();
    }
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            error: "not authenticated",
        });
    }
    const token = authHeader.split(" ")[1];

    jwt.verify(token, "azurill", (err, decoded) => {
        if (err) {
            return res.status(403).json({
                error: "not authorized",
            });
        }
        console.log("Dale papu segui nomas");
        req.user = (<any>decoded).data;
        next();
    });
};
