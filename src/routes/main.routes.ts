import { Router } from "express";
import passport from "passport";
import { MainController } from "../controllers";
import { isAuth } from "../middlewares";

const controller = new MainController();

const mainRouter = Router();

mainRouter.get("/", isAuth, controller.getMain);
mainRouter.get("/register", controller.getRegister);
mainRouter.post("/register", controller.postRegister);
mainRouter.get("/login", controller.getLogin);
mainRouter.post(
    "/login",
    passport.authenticate("jwt", { successRedirect: "/", failureRedirect: "/login" }),
    controller.postLogin
);
mainRouter.get("/chat", controller.getChat);

export { mainRouter };
