import { ProductoDto } from "./productos.dto";

export class CarritoDto {
    email: string;
    productos: { producto: ProductoDto, cantidad: number }[];
    timestamp: string;
    constructor(data: any) {
        this.email = data.email;
        this.productos = data.productos;
        this.timestamp = data.timestamp;
    }
}
