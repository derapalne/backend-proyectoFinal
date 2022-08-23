import { ProductosDao } from "../daos";
import { ProductoDto } from "../dtos";
import { config } from "../utils";

const dao = new ProductosDao(config.mongoUri);

export class ProductosService {
    async getById(id: string) {
        return await dao.getById(id);
    }
    async getByCategory(categoria: string) {
        return await dao.getByCategory(categoria);
    }
    async getAll() {
        return await dao.getAll();
    }
    async add(data: any) {
        // console.log("Data desde el service: ", data);
        data.timestamp = Date.now();
        const producto = new ProductoDto(data);
        return await dao.add(producto);
    }
    async updateById(id: string, data: any) {
        const producto = new ProductoDto(data);
        return await dao.updateById(id, producto);
    }
    async deleteById(id: string) {
        return await dao.deleteById(id);
    }
}