import { Router } from "express";
import passport from "passport";
import { MainController } from "../controllers";
import { isAuth } from "../middlewares";
import "../middlewares/authLocal";

const controller = new MainController();

const mainRouter = Router();

// Principal
mainRouter.get("/", isAuth, controller.getMain);
// Registro
mainRouter.get("/register", controller.getRegister);
mainRouter.get("/register-error", controller.getRegisterError);
mainRouter.post(
    "/register",
    passport.authenticate("local-register", {
        successRedirect: "/",
        failureRedirect: "/register-error",
        passReqToCallback: true,
    })
);
// Logueo
mainRouter.get("/login", controller.getLogin);
mainRouter.get("/login-error", controller.getLoginError);
mainRouter.post(
    "/login",
    passport.authenticate("local-login", {
        failureRedirect: "/login-error",
        passReqToCallback: true,
    }),
    controller.postLogin
);
// Deslogueo
mainRouter.post("/logout", isAuth, controller.postLogout);
// Chat
mainRouter.get("/chat/:email?", isAuth, controller.getChat);
// Configuración
mainRouter.get("/config", isAuth, controller.getConfig);

export { mainRouter };
