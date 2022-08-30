import { Router } from "express";
import { ProductosController } from "../controllers";
import { isAdmin, isAuth } from "../middlewares";

const productosRouter = Router();
const productosApiRouter = Router();
const controller = new ProductosController();

// Vistas
//GET
productosRouter.get("/", isAuth, controller.getAllView);
productosRouter.get("/:id", isAuth, controller.getByIdView);

// Api
// GET
productosApiRouter.get("/", isAuth, controller.getAllApi);
productosApiRouter.get("/:id", isAuth, controller.getByIdApi);
// POST PROD
productosApiRouter.post("/", isAdmin, controller.add);
// PUT PROD BY ID
productosApiRouter.put("/:id", isAdmin, controller.updateById);
// DELETE BY ID
productosApiRouter.delete("/:id", isAdmin, controller.deleteById);

export { productosRouter, productosApiRouter };
