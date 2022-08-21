import express, { Express } from "express";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import compression from "compression";
import path from "node:path";

import { productosRouter, carritosRouter, mainRouter } from "./routes";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    session({
        store: MongoStore.create({
            mongoUrl: "mongodb://127.0.0.1:27017/pfinal_db",
        }),
        secret: "bombonera",
        resave: false,
        rolling: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 3600000,
        },
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(compression());
app.use(express.static(path.join(__dirname + "/public")));
app.set("views", path.join(__dirname + "/views/"));
app.set("view engine", "ejs");

app.use("/api/productos", productosRouter);
app.use("/", mainRouter);
app.use("/api/carritos", carritosRouter);

const PORT = 7777;

app.get("/", (req, res) => {
    res.render("main");
});

const server = app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
server.on("error", (error) => console.log("Error en el servidor: ", error));
