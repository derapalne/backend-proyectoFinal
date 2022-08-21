import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import bcrypt from "bcrypt";
import { UsuariosDao } from "../daos";

const dao = new UsuariosDao("mongodb://127.0.0.1:27017/pfinal_db");

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "azurill",
};

passport.serializeUser((usuario, done) => {
    done(null, usuario);
});

passport.deserializeUser(async (email: string, done) => {
    const usuario = await dao.getByEmail(email);
    done(null, usuario);
});

passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        const existe = await dao.getByPayload(jwt_payload);
        if (existe) {
            return done(null, existe);
        } else {
            return done(null, false);
        }
    })
);

const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
}

export {comparePassword};