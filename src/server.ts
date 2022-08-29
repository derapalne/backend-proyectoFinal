import express, { Express } from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import compression from "compression";
import path from "node:path";
import cors from "cors";

import { productosRouter, carritosRouter, mainRouter, ordenesRouter } from "./routes";
import { MensajesService } from "./services";
import { corsOptions, config } from "./utils";
import { logRoutes } from "./middlewares";

const PORT = config.port;

const app: Express = express();

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: config.mongoUri,
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
app.use(logRoutes)
app.use(compression());
app.use(express.static(path.join(__dirname + "/public")));
app.set("views", path.join(__dirname + "/views/"));
app.set("view engine", "ejs");

app.use("/", mainRouter);
app.use("/api/productos", productosRouter);
app.use("/api/carritos", carritosRouter);
app.use("/api/ordenes", ordenesRouter);

app.get("/", (req, res) => {
    res.render("main");
});

const server = httpServer.listen(PORT, () => console.log(`http://localhost:${PORT}`));
server.on("error", (error) => console.log("Error en el servidor: ", error));

const mensajesService = new MensajesService();

io.on("connection", async (socket) => {
    socket.on("mensajeEnviado", async (mensaje) => {
        await mensajesService.add(mensaje);
        io.sockets.emit("chatRefresh", mensaje);
    });
});
