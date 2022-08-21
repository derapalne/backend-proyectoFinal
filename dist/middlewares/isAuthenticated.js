"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        console.log("hola no autenticado");
        res.status(403).redirect("/login");
    }
};
exports.isAuth = isAuth;
