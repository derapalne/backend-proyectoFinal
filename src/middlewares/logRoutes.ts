import { NextFunction, Request, Response } from "express";
import { logger } from "../utils";

export const logRoutes = async (req: Request, res: Response, next: NextFunction) => {
    const route = req.path;
    const method = req.method;
    const mensaje = `Petición ${method} - Ruta ${route}`;
    if (req.path.slice(0,3) != "/js" && req.path.slice(0,3) != "/im") logger.info(mensaje);
    next();
};
