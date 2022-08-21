import { Router } from "express";
import passport from "passport";
import { MainController } from "../controllers";
import { isAuth } from "../middlewares";

const controller = new MainController();

const mainRouter = Router();

mainRouter.get("/", isAuth, controller.getMain);
mainRouter.get("/register", controller.registerGet);
mainRouter.post(
    "/register",
    passport.authenticate("jwt", { successRedirect: "/", failureRedirect: "/register" }),
    controller.registerPost
);
mainRouter.get("/login", controller.loginGet);
mainRouter.post(
    "/login",
    passport.authenticate("jwt", { successRedirect: "/", failureRedirect: "/login" }),
    controller.loginPost
);

export { mainRouter };
