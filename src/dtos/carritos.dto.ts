import { ProductoDto } from "./productos.dto";

export class CarritoDto {
    email: string;
    productos: ProductoDto[];
    timestamp: string;
    constructor(data: any) {
        this.email = data.email;
        this.productos = data.productos;
        this.timestamp = data.timestamp;
    }
}