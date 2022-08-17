export class ProductoDto {
    id?: number;
    nombre: string;
    descripcion: string;
    categoria: string;
    precio: number;
    thumbnail: string;
    timestamp: number;
    constructor(data: any) {
        console.log("Data desde el dto PRODUCTOS: ", data);
        this.id = data.id;
        this.nombre = data.nombre;
        this.descripcion = data.descripcion;
        this.categoria = data.codigo;
        this.precio = data.precio;
        this.thumbnail = data.thumbnail;
        this.timestamp = data.timestamp;
    }
}
