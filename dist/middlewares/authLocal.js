"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const bcrypt_1 = __importDefault(require("bcrypt"));
const daos_1 = require("../daos");
const utils_1 = require("../utils");
const dtos_1 = require("../dtos");
const dao = new daos_1.UsuariosDao(utils_1.config.mongoUri);
passport_1.default.serializeUser((usuario, done) => {
    done(null, usuario);
});
passport_1.default.deserializeUser((email, done) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield dao.getByEmail(email);
    done(null, usuario);
}));
passport_1.default.use("local-register", new passport_local_1.Strategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
}, (req, email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    const existe = yield dao.getByEmail(email);
    if (existe) {
        return done(null, false);
    }
    const usuarioData = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        email: req.body.email,
        password: yield bcrypt_1.default.hash(password, 10),
    };
    const usuario = yield dao.add(new dtos_1.UsuarioDto(usuarioData));
    // console.log({ usuario });
    // ENVIAR MAIL DE CONFIRMACION
    return done(null, usuario);
})));
passport_1.default.use("local-login", new passport_local_1.Strategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
}, (req, email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hola, logueandome:", email, password);
    const usuario = yield dao.getByEmail(email);
    console.log(usuario);
    if (!usuario) {
        return done(null, false);
    }
    const passOk = yield comparePassword(password, usuario.password);
    console.log(passOk);
    if (!passOk) {
        return done(null, false);
    }
    return done(null, usuario);
})));
const comparePassword = (password, hash) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(password, hash);
});
exports.comparePassword = comparePassword;
