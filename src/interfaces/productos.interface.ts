export interface IProducto {
    id?: number;
    nombre: string;
    descripcion: string;
    categoria: string;
    precio: number;
    thumbnail: string;
    timestamp?: number;
}