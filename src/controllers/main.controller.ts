import { Request, Response } from "express";
import { UsuariosService } from "../services";
import { comparePassword } from "../middlewares/authJwt";
import jwt from "jsonwebtoken";
import { UsuarioDto } from "../dtos";

const service = new UsuariosService();

const createToken = (usuario: UsuarioDto) => {
    return jwt.sign(
        { nombreCompleto: usuario.nombreCompleto, email: usuario.email },
        "SecretoDesdeDotEnv",
        {
            expiresIn: 60,
        }
    );
};

export class MainController {
    async getMain(req: Request, res: Response) {
        res.redirect("/productos");
    }

    async registerGet(req: Request, res: Response) {
        res.render("register", { msg: "" });
    }

    async registerPost(req: Request, res: Response) {
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

    async loginGet(req: Request, res: Response) {
        res.render("login", { msg: "" });
    }

    async loginPost(req: Request, res: Response) {
        if (!req.body.email || !req.body.password) {
            res.status(400).render("login", { msg: "Por favor envíe los datos necesarios" });
        }
        const usuarioExistente = await service.getByEmail(req.body.email);
        if (!usuarioExistente) {
            res.status(400).render("login", { msg: "El usuario es inexistente" });
        } else {
            const coincide = await comparePassword(req.body.password, usuarioExistente.password);
            if (coincide) res.status(200).redirect("/");
        }
    }
}
