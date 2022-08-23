"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuth = (req, res, next) => {
    console.log("autenticando...");
    if (req.isAuthenticated()) {
        console.log("AUTENTICADO");
        return next();
    }
    // console.log(req.cookies);
    const authToken = req.cookies.userInfo.token;
    if (!authToken) {
        return res.status(401).json({
            error: "not authenticated",
        });
    }
    const token = authToken.split(".")[1];
    console.log(token);
    jsonwebtoken_1.default.verify(token, "azurill", (err, decoded) => {
        if (err) {
            return res.status(403).json({
                error: "not authorized",
            });
        }
        console.log("Dale papu segui nomas");
        req.user = decoded.data;
        next();
    });
};
exports.isAuth = isAuth;
