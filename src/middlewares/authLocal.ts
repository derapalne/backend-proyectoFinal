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

let passwordXD = "";

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
            console.log({ email, password });
            const usuarioData = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                email: req.body.email,
                password: "",
            };
            usuarioData.password = await bcrypt.hash(password, 10);
            console.log({ usuarioData });
            passwordXD = usuarioData.password;
            const usuarioDto = new UsuarioDto(usuarioData);
            console.log(
                "Comparando contraseñas DTO...",
                await comparePassword(password, usuarioDto.password)
            );
            const usuario = await dao.add(usuarioDto);
            console.log(
                "Comparando contraseñas...",
                await comparePassword(password, usuarioData.password)
            );
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
            console.log("usuario desde local login auth passport", usuario);
            if (!usuario) {
                return done(null, false);
            }
            console.log;
            const passOk = await bcrypt.compare(password, usuario.password);
            console.log(
                "COMPARANDO CONTRASEÑAS EN SERVIDOR MEMEORIA: ",
                await bcrypt.compare(password, passwordXD)
            );
            if (!passOk) {
                console.log("NO PASASTE LA PRUEBA DE LA CONTRASEÑA");
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
