import { Schema, model } from "mongoose";
import { IProducto } from "../interfaces";

const ProductosSchema = new Schema<IProducto>({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    categoria: { type: String, required: true },
    thumbnail: { type: String, required: true },
    id: { type: Number, required: true },
    precio: { type: Number, required: true },
    timestamp: { type: Number, required: true },
});

const ProductoModel = model<IProducto>("Producto", ProductosSchema);

export { ProductosSchema, ProductoModel };
