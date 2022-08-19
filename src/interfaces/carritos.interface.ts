import { Types } from "mongoose";
import { ProductoDto } from "../dtos";

export interface ICarrito {
    email: string;
    productos: Types.DocumentArray<{ producto: ProductoDto; cantidad: number }>;
    timestamp: string;
}
