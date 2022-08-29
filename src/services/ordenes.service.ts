import { PreMiddlewareFunction } from "mongoose";
import { OrdenesDao, CarritosDao } from "../daos";
import { CarritoDto, OrdenDto, ProductoDto } from "../dtos";
import { config } from "../utils";

const carritosDao = new CarritosDao(config.mongoUri);
const ordenesDao = new OrdenesDao(config.mongoUri);

export class OrdenesService {
    async add(email: string): Promise<OrdenDto | undefined> {
        try {
            // Traer el carrito con los productos de la orden.
            const carrito = await carritosDao.getByEmail(email);
            const d = new Date();
            // Crear la fecha y hora en formato DD-MM-YYYY --- HH:MM:SS
            const fyh = `${d.getDay()}-${
                d.getMonth() + 1
            }-${d.getFullYear()} --- ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
            // Por defecto que la ID de orden sea 1.
            let ordenId = 1;
            const ordenes = await ordenesDao.getAll();
            // Si hay más órdenes, actualizar la ID para que sea uno más que la última orden.
            if (ordenes && ordenes.length >= 1) {
                ordenId = ordenes[ordenes.length - 1].ordenId + 1;
            }
            // Crear el DTO de la orden.
            const orden: OrdenDto = new OrdenDto({
                email: email,
                productos: carrito.productos,
                fyh: fyh,
                ordenId: ordenId,
                estado: "GENERADA",
            });
            // Agregar la orden a la base de datos
            const ordenResp = await ordenesDao.add(orden);
            if (ordenResp) {
                await carritosDao.deleteByEmail(email);
                return ordenResp;
            } else return undefined;
        } catch (e) {
            return e;
        }
    }

    async updateById(id: number, email: string) {
        try {
            const carrito = await carritosDao.getByEmail(email);
            const orden = await ordenesDao.getByOrdenId(id);
            orden.productos = carrito.productos;
            return await ordenesDao.updateByEmail(id, orden);
        } catch (e) {
            return e;
        }
    }

    async getByEmail(email: string) {
        try {
            return await ordenesDao.getByEmail(email);
        } catch (e) {
            return e;
        }
    }
}
