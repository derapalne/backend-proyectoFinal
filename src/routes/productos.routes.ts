import { Router } from "express";
import { ProductosController } from "../controllers";
import { isAuth } from "../middlewares";

const productosRouter = Router();
const controller = new ProductosController();

// GET ALL
productosRouter.get("/", isAuth, controller.getAll);
// GET BY ID O CATEGORIA
productosRouter.get("/:id", isAuth, controller.getById);
// POST PROD
productosRouter.post("/", isAuth, controller.add);
// PUT PROD BY ID
productosRouter.put("/:id", isAuth, controller.updateById);
// DELETE BY ID
productosRouter.delete("/:id", isAuth, controller.deleteById);

export { productosRouter };
