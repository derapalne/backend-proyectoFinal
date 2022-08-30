import { Router } from "express";
import { OrdenesController } from "../controllers";
import { isAdmin, isAuth } from "../middlewares";

const ordenesRouter = Router();
const ordenesApiRouter = Router();
const controller = new OrdenesController();

// Vista
ordenesRouter.get("/", isAuth, controller.getOrdenesView);
// Api
ordenesApiRouter.get("/", isAuth, controller.getOrdenesApi);
ordenesApiRouter.post("/", isAuth, controller.postOrden);
ordenesApiRouter.put("/", isAdmin, controller.updateOrden);

export { ordenesRouter, ordenesApiRouter };
