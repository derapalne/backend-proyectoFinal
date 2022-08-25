import { Schema, model } from "mongoose";
import { IOrden } from "../interfaces";

const OrdenesSchema = new Schema<IOrden>({
    email: { type: String, required: true },
    productos: [
        {
            producto: {
                nombre: String,
                descripcion: String,
                id: String,
                categoria: String,
                precio: Number,
                thumbnail: String,
                timestamp: Number,
            },
            cantidad: { type: Number },
        },
    ],
    ordenId: { type: Number, required: true },
    estado: { type: String, required: true },
    fyh: { type: String, required: true },
});

// Se llama "Ordene" para que la colección figure como ordenes y no ordens :p
const OrdenModel = model<IOrden>("Ordene", OrdenesSchema);

export { OrdenModel, OrdenesSchema };
