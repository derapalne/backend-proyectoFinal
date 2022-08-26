import { Request, Response } from "express";
import { MensajesService, UsuariosService } from "../services";
import { comparePassword } from "../middlewares/authLocal";
import jwt from "jsonwebtoken";
import { UsuarioDto } from "../dtos";
import { config } from "../utils";

const service = new UsuariosService();
const mensajesService = new MensajesService();

const createToken = (usuario: UsuarioDto) => {
    return jwt.sign(
        { nombreCompleto: usuario.nombreCompleto, email: usuario.email },
        config.secret,
        {
            expiresIn: 600,
        }
    );
};

export class MainController {
    async getMain(req: Request, res: Response) {
        try {
            res.redirect("/api/productos");
        } catch (e) {
            res.status(500).render("error", { error: e });
        }
    }

    async getRegister(req: Request, res: Response) {
        try {
            res.render("register", { msg: "" });
        } catch (e) {
            res.status(500).render("error", { error: e });
        }
    }

    async getRegisterError(req: Request, res: Response) {
        try {
            res.render("register", { msg: "No se ha podido registrar al usuario." });
        } catch (e) {
            res.status(500).render("error", { error: e });
        }
    }

    async postRegister(req: Request, res: Response) {
        try {
            const usuarioExistente = await service.getByEmail(req.body.email);
            if (usuarioExistente) {
                res.render("register", { msg: "Ya existe una cuenta asociada a ese email." });
            } else {
                const nuevoUsuario = await service.add(req.body);
                res.redirect("/login");
            }
        } catch (e) {
            res.status(500).render("error", { error: e });
        }
    }

    async getLogin(req: Request, res: Response) {
        try {
            res.render("login", { msg: "" });
        } catch (e) {
            res.status(500).render("error", { error: e });
        }
    }

    async getLoginError(req: Request, res: Response) {
        try {
            res.render("login", { msg: "Error de credenciales!" });
        } catch (e) {
            res.status(500).render("error", { error: e });
        }
    }

    async postLogin(req: Request, res: Response) {
        try {
            if (!req.body.email || !req.body.password) {
                res.status(400).render("login", { msg: "Por favor envíe los datos necesarios" });
            }
            const usuarioExistente = await service.getByEmail(req.body.email);
            if (!usuarioExistente) {
                res.status(400).render("login", { msg: "El usuario es inexistente" });
            } else {
                const coincide = await comparePassword(
                    req.body.password,
                    usuarioExistente.password
                );
                if (coincide) {
                    const token = createToken(usuarioExistente);
                    res.cookie("userInfo", { user: usuarioExistente, token: token });
                    res.status(200).redirect("/");
                }
            }
        } catch (e) {
            res.status(500).render("error", { error: e });
        }
    }

    async postLogout(req: Request, res: Response) {
        try {
            req.session.destroy((e) => {
                if (e) res.render("error", { error: e });
            });
            req.cookies.userInfo = null;
            res.render("logout");
        } catch (e) {
            res.status(500).render("error", { error: e });
        }
    }

    async getChat(req: Request, res: Response) {
        try {
            let email = "";
            if (req.user) email = req.user.email;
            else email = req.cookies.userInfo.user.email;
            if (req.params.email)
                res.render("chat", {
                    mensajes: await mensajesService.getByEmail(req.params.email),
                    email: email,
                });
            else
                res.render("chat", {
                    mensajes: await mensajesService.getAll(),
                    email: email,
                });
        } catch (e) {
            res.status(500).render("error", { error: e });
        }
    }
}
