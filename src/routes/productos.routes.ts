import {Router} from "express";
import { ProductosController } from "../controllers";

const productosRouter = Router();
const controller = new ProductosController();

// GET ALL
productosRouter.get("/", controller.getAll);
// GET BY ID O CATEGORIA
productosRouter.get("/:id", controller.getById);
// POST PROD
productosRouter.post("/", controller.add);
// PUT PROD BY ID
productosRouter.put("/:id", controller.updateById);
// DELETE BY ID
productosRouter.delete("/:id", controller.deleteById);


export {productosRouter};