import { Schema, model } from "mongoose";
import { ProductoDto } from "../dtos";
import { ICarrito } from "../interfaces";

const CarritosSchema = new Schema<ICarrito>({
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
    timestamp: { type: String, required: true },
});

const CarritoModel = model<ICarrito>("Carrito", CarritosSchema);

export { CarritoModel, CarritosSchema };
