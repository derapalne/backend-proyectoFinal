import { Router } from "express";
import passport from "passport";
import { MainController } from "../controllers";
import { isAuth } from "../middlewares";
import "../middlewares/authLocal";

const controller = new MainController();

const mainRouter = Router();

mainRouter.get("/", isAuth, controller.getMain);
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

mainRouter.get("/login", controller.getLogin);
mainRouter.get("/login-error", controller.getLoginError);
mainRouter.post(
    "/login",
    passport.authenticate("local-login", {
        // successRedirect: "/",
        failureRedirect: "/login-error",
        passReqToCallback: true,
    }),
    (req, res) => {
        // console.log("req desde post login",req.user);
        res.redirect("/");
    }
);
mainRouter.post("/logout",isAuth, controller.postLogout)
mainRouter.get("/chat", isAuth, controller.getChat);

export { mainRouter };
