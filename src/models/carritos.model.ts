import { Schema, model } from "mongoose";
import { ICarrito } from "../interfaces";

const CarritosSchema = new Schema<ICarrito>({
    email: { type: String, required: true },
    productos: [
        {
            nombre: String,
            descripcion: String,
            categoria: String,
            thumbnail: String,
            id: Number,
            precio: Number,
            timestamp: Number,
        },
    ],
    timestamp: { type: String, required: true },
});

const CarritoModel = model<ICarrito>("Carrito", CarritosSchema);

export { CarritoModel, CarritosSchema };
