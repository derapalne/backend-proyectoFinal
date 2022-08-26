import { ProductosDao } from "../daos";
import { ProductoDto } from "../dtos";
import { config } from "../utils";

const dao = new ProductosDao(config.mongoUri);

export class ProductosService {
    async getById(id: string) {
        try {
            return await dao.getById(id);
        } catch (e) {
            return e;
        }
    }
    async getByCategory(categoria: string) {
        try {
            return await dao.getByCategory(categoria);
        } catch (e) {
            return e;
        }
    }
    async getAll() {
        try {
            return await dao.getAll();
        } catch (e) {
            return e;
        }
    }
    async add(data: any) {
        try {
            data.timestamp = Date.now();
            const producto = new ProductoDto(data);
            return await dao.add(producto);
        } catch (e) {
            return e;
        }
    }
    async updateById(id: string, data: any) {
        try {
            const producto = new ProductoDto(data);
            return await dao.updateById(id, producto);
        } catch (e) {
            return e;
        }
    }
    async deleteById(id: string) {
        try {
            return await dao.deleteById(id);
        } catch (e) {
            return e;
        }
    }
}
