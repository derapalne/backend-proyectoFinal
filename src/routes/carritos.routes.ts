import { Router } from "express";
import { CarritosController } from "../controllers";
import { isAdmin, isAuth } from "../middlewares";

const carritosRouter = Router();
const carritosApiRouter = Router();
const controller = new CarritosController();

// Vistas
carritosRouter.get("/", isAuth, controller.getByEmailView); // listar productos
// Api
carritosApiRouter.get("/", isAuth, controller.getByEmailApi); // listar productos
carritosApiRouter.post("/", isAdmin, controller.postProducto); // agregar productos
carritosApiRouter.delete("/:id", isAdmin, controller.removeProducto); // eliminar productos

export { carritosRouter, carritosApiRouter };
