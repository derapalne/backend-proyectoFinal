import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(403).redirect("/login");
    }
    // console.log(req.cookies);

    // const authToken = req.cookies.userInfo.token;
    // if (!authToken) {
    //     return res.status(401).json({
    //         error: "not authenticated",
    //     });
    // }
    // const token = authToken.split(".")[1];
    // console.log(token);

    // jwt.verify(token, "azurill", (err, decoded) => {
    //     if (err) {
    //         return res.status(403).json({
    //             error: "not authorized",
    //         });
    //     }
    //     console.log("Dale papu segui nomas");
    //     req.user = (<any>decoded).data;
    //     next();
    // });
};
