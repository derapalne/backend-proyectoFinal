import { OrdenesDao, CarritosDao } from "../daos";
import { CarritoDto, OrdenDto, ProductoDto } from "../dtos";
import { config } from "../utils";

const carritosDao = new CarritosDao(config.mongoUri);
const ordenesDao = new OrdenesDao(config.mongoUri);

export class OrdenesService {
    async add(email: string) {
        const carrito = await carritosDao.getByEmail(email);
        const d = new Date();
        const fyh = `${d.getDay()}-${
            d.getMonth() + 1
        }-${d.getFullYear()} --- ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
        let ordenId = 1;
        const ordenes = await ordenesDao.getAll();
        console.log({ordenes, carrito});
        if (ordenes && ordenes.length >= 1) {
            ordenId = ordenes[ordenes.length - 1].ordenId + 1;
        }
        const orden: OrdenDto = new OrdenDto({
            email: email,
            productos: carrito.productos,
            fyh: fyh,
            ordenId: ordenId,
            estado: "GENERADA",
        });
        if (await ordenesDao.add(orden)) {
            return await carritosDao.deleteByEmail(email);
        }
    }

    async updateById(id: number, email: string) {
        const carrito = await carritosDao.getByEmail(email);
        const orden = await ordenesDao.getByOrdenId(id);
        orden.productos = carrito.productos;
        return await ordenesDao.updateById(id, orden);
    }

    async getByEmail(email: string) {
        return await ordenesDao.getByEmail(email);
    }
}
