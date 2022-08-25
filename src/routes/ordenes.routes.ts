import { Router } from "express";
import { OrdenesController } from "../controllers";
import { isAuth } from "../middlewares";

const ordenesRouter = Router();
const controller = new OrdenesController();

ordenesRouter.get("/", isAuth, controller.getOrdenes);
ordenesRouter.post("/", isAuth, controller.postOrden);

export { ordenesRouter };
