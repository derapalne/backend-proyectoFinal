import { Request, Response } from "express";
import { MensajesService, UsuariosService } from "../services";
import { comparePassword } from "../middlewares/authLocal";
import jwt from "jsonwebtoken";
import { UsuarioDto } from "../dtos";

const service = new UsuariosService();
const mensajesService = new MensajesService();

const createToken = (usuario: UsuarioDto) => {
    return jwt.sign({ nombreCompleto: usuario.nombreCompleto, email: usuario.email }, "azurill", {
        expiresIn: 60,
    });
};

export class MainController {
    async getMain(req: Request, res: Response) {
        res.redirect("/api/productos");
    }

    async getRegister(req: Request, res: Response) {
        res.render("register", { msg: "" });
    }

    async getRegisterError(req: Request, res: Response) {
        res.render("register", { msg: "No se ha podido registrar al usuario." });
    }

    async postRegister(req: Request, res: Response) {
        console.log("RegisterPost");
        const usuarioExistente = await service.getByEmail(req.body.email);
        console.log(req.body);
        if (usuarioExistente) {
            res.render("register", { msg: "Ya existe una cuenta asociada a ese email." });
        } else {
            const nuevoUsuario = await service.add(req.body);
            console.log(nuevoUsuario);
            res.redirect("/login");
        }
    }

    async getLogin(req: Request, res: Response) {
        console.log(req.header("authorization"));
        res.render("login", { msg: "" });
    }

    async getLoginError(req: Request, res: Response) {
        console.log(req.header("authorization"));
        res.render("login", { msg: "Error de credenciales!" });
    }


    async postLogin(req: Request, res: Response) {
        if (!req.body.email || !req.body.password) {
            res.status(400).render("login", { msg: "Por favor envíe los datos necesarios" });
        }
        const usuarioExistente = await service.getByEmail(req.body.email);
        if (!usuarioExistente) {
            res.status(400).render("login", { msg: "El usuario es inexistente" });
        } else {
            const coincide = await comparePassword(req.body.password, usuarioExistente.password);
            if (coincide) {
                const token = createToken(usuarioExistente);
                res.cookie("userInfo", {user: usuarioExistente, token: token});
                res.status(200).redirect("/");
            }
        }
    }

    async getChat(req: Request, res: Response) {
        res.render("chat", { mensajes: await mensajesService.getAll(), email: "req.user.email" });
    }
}
