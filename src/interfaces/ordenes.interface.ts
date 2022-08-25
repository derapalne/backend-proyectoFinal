import { Types } from "mongoose";
import { ProductoDto } from "../dtos";

export interface IOrden {
    email: string;
    productos: Types.DocumentArray<{producto: ProductoDto, cantidad: number}>;
    ordenId: number;
    estado: string;
    fyh: string;
}