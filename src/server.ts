import express, { Express } from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import path from "node:path";

import { productosRouter, carritosRouter, mainRouter } from "./routes";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(compression());

// passport mierda

console.log(path.join(__dirname + "/public"));
console.log(path.join(process.cwd() + "/public"));

app.use(express.static(path.join(__dirname + "/public")));
app.set("views", path.join(__dirname + "/views/"));
app.set("view engine", "ejs");

app.use("/api/productos", productosRouter);
app.use("/api/main", mainRouter);
app.use("/api/carritos", carritosRouter);


const PORT = 7777;

app.get("/", (req, res) => {
    res.render("main");
});

const server = app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
server.on("error", (error) => console.log("Error en el servidor: ", error));
