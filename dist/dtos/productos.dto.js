"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoDto = void 0;
class ProductoDto {
    constructor(data) {
        console.log("Data desde el dto PRODUCTOS: ", data);
        this.id = data.id;
        this.nombre = data.nombre;
        this.descripcion = data.descripcion;
        this.codigo = data.codigo;
        this.precio = data.precio;
        this.thumbnail = data.thumbnail;
        this.stock = data.stock;
        this.timestamp = data.timestamp;
    }
}
exports.ProductoDto = ProductoDto;
