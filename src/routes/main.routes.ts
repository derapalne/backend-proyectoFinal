import { Router } from "express"
import { MainController } from "../controllers";

const controller = new MainController();

const mainRouter = Router();

mainRouter.get("/", controller.getMain);

export {mainRouter};