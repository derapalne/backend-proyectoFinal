import { Router } from "express";
import { CarritosController } from "../controllers";
import { isAuth } from "../middlewares";

const carritosRouter = Router();
const controller = new CarritosController();

carritosRouter.get("/", isAuth, controller.getByEmail); // listar productos
carritosRouter.post("/", isAuth, controller.postProducto); // agregar productos
carritosRouter.put("/:id", isAuth, controller.postProducto); // modificar producto por id
carritosRouter.delete("/:id", controller.removeProducto); // eliminar productos

export { carritosRouter };
