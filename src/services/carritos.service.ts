import { CarritosDao, ProductosDao } from "../daos";
import { CarritoDto, ProductoDto } from "../dtos";
import { config } from "../utils";

const dao = new CarritosDao(config.MONGO_URI);
const prodDao = new ProductosDao(config.MONGO_URI);

export class CarritosService {
    async add(email: string) {
        try {
            // Se crea el carrito y se agrega a la base de datos.
            const carrito: CarritoDto = {
                email: email,
                productos: [],
                timestamp: Date.now().toString(),
            };
            return await dao.add(carrito);
        } catch (e) {
            return e;
        }
    }

    async addProd(email: string, id: string) {
        try {
            // Traer tanto al producto a agregar como al carrito
            const producto: ProductoDto = await prodDao.getById(id);
            const carrito: CarritoDto = await dao.getByEmail(email);
            // Buscar el indice donde está el producto para ver si está
            const prodIndex = carrito.productos.findIndex(
                (p) => p.producto.nombre == producto.nombre
            );
            if (prodIndex != -1) {
                // Si da un resultado positivo, se encontró, entonces se actualiza la cantidad
                carrito.productos[prodIndex].cantidad = carrito.productos[prodIndex].cantidad + 1;
                console.log(carrito.productos[prodIndex].cantidad);
            } else {
                // Si es -1, no se encontró, entonces hay que agregarlo
                const productoCant = { producto: producto, cantidad: 1 };
                carrito.productos.push(productoCant);
            }
            return await dao.updateByEmail(email, carrito);
        } catch (e) {
            return e;
        }
    }

    async removeProd(email: string, id: string) {
        try {
            const carrito: CarritoDto = await dao.getByEmail(email);
            const prodIndex = carrito.productos.findIndex((p) => p.producto.id == Number(id));
            if (prodIndex != -1) {
                if (carrito.productos[prodIndex].cantidad == 1)
                    carrito.productos = carrito.productos.filter(
                        (p) => p.producto.id != Number(id)
                    );
                else
                    carrito.productos[prodIndex].cantidad =
                        carrito.productos[prodIndex].cantidad - 1;
                return await dao.updateByEmail(email, carrito);
            } else {
                return "Producto no encontrado";
            }
        } catch (e) {
            return e;
        }
    }

    async getByEmail(email: string) {
        try {
            return await dao.getByEmail(email);
        } catch (e) {
            return e;
        }
    }
}
