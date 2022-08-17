import express, {Express} from "express";
import { productosRouter } from "./routes";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/prods", productosRouter);

const PORT = 7777;

app.get("/", (req, res) => {
    res.json({mensaje: "Hola funcioando 1 2 3 funcionando hola"});
})

const server = app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
server.on("error", (error) => console.log("Error en el servidor: ", error));
