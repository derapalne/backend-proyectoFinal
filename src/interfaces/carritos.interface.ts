import { Types } from "mongoose";
import { ProductoDto } from "../dtos";

export interface ICarrito {
    email: string;
    productos: Types.DocumentArray<ProductoDto>;
    timestamp: string;
}