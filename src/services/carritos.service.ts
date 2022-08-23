import { CarritosDao, ProductosDao } from "../daos";
import { CarritoDto, ProductoDto } from "../dtos";
import { config } from "../utils";

const dao = new CarritosDao(config.mongoUri);
const prodDao = new ProductosDao(config.mongoUri);

export class CarritosService {
    async add(email: string) {
        const carrito: CarritoDto = {
            email: email,
            productos: [],
            timestamp: Date.now().toString(),
        };
        return await dao.add(carrito);
    }

    async addProd(email: string, id: string) {
        const producto: ProductoDto = await prodDao.getById(id);
        const carrito: CarritoDto = await dao.getByEmail(email);
        const prodIndex = carrito.productos.findIndex((p) => p.producto.nombre == producto.nombre);
        if (prodIndex != -1) {
            carrito.productos[prodIndex].cantidad = carrito.productos[prodIndex].cantidad++;
        } else carrito.productos.push({ producto, cantidad: 1 });
        return await dao.updateByEmail(email, carrito);
    }

    async removeProd(email: string, id: string) {
        const carrito: CarritoDto = await dao.getByEmail(email);
        const prodIndex = carrito.productos.findIndex((p) => p.producto.id != Number(id));
        if (prodIndex != -1) {
            if (carrito.productos[prodIndex].cantidad == 1)
                carrito.productos = carrito.productos.filter((p) => p.producto.id != Number(id));
            else carrito.productos[prodIndex].cantidad = carrito.productos[prodIndex].cantidad--;
            return await dao.updateByEmail(email, carrito);
        } else {
            return "Producto no encontrado";
        }
    }

    async getByEmail(email: string) {
        return await dao.getByEmail(email);
    }
}
