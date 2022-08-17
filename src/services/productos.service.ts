import { ProductosDao } from "../daos";
import { ProductoDto } from "../dtos";

const dao = new ProductosDao();

export class ProductosService {
    getById(id: string) {
        return dao.getById(id);
    }
    getAll() {
        return dao.getAll();
    }
    add(data: any) {
        const producto = new ProductoDto(data);
        return dao.add(producto);
    }
    updateById(id: string, data: any) {
        const producto = new ProductoDto(data);
        return dao.updateById(id, producto);
    }
    deleteById(id: string) {
        return dao.deleteById(id);
    }
}