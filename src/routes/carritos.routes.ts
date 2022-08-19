import { Router } from "express";
import { CarritosController } from "../controllers";

const carritosRouter = Router();
const controller = new CarritosController();

carritosRouter.get("/", controller.getByEmail)  // listar productos
carritosRouter.post("/", controller.postProducto) // agregar productos
carritosRouter.put("/:id", controller.postProducto) // modificar producto por id
carritosRouter.delete("/:id", controller.removeProducto) // eliminar productos

export {carritosRouter};
