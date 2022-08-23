import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { UsuariosDao } from "../daos";
import { config } from "../utils";
import { Request } from "express";
import { UsuarioDto } from "../dtos";

const dao = new UsuariosDao(config.mongoUri);

passport.serializeUser((usuario, done) => {
    done(null, usuario);
});

passport.deserializeUser(async (email: string, done) => {
    const usuario = await dao.getByEmail(email);
    done(null, usuario);
});

passport.use(
    "local-register",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true,
        },
        async (req: Request, email: string, password: string, done) => {
            const existe = await dao.getByEmail(email);
            if (existe) {
                return done(null, false);
            }
            const usuarioData = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                email: req.body.email,
                password: await bcrypt.hash(password, 10),
            };
            const usuario = await dao.add(new UsuarioDto(usuarioData));
            // console.log({ usuario });
            // ENVIAR MAIL DE CONFIRMACION
            return done(null, usuario);
        }
    )
);

passport.use(
    "local-login",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true,
        },
        async (req: Request, email: string, password: string, done) => {
            console.log("hola, logueandome:", email, password);
            const usuario = await dao.getByEmail(email);
            console.log(usuario);
            if (!usuario) {
                return done(null, false);
            }
            const passOk = await comparePassword(password, usuario.password);
            console.log(passOk);
            if (!passOk) {
                return done(null, false);
            }
            return done(null, usuario);
        }
    )
);

const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
};

export { comparePassword };
