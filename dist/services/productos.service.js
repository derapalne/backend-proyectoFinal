"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductosService = void 0;
const daos_1 = require("../daos");
const dtos_1 = require("../dtos");
const dao = new daos_1.ProductosDao();
class ProductosService {
    getById(id) {
        return dao.getById(id);
    }
    getAll() {
        return dao.getAll();
    }
    add(data) {
        const producto = new dtos_1.ProductoDto(data);
        return dao.add(producto);
    }
    updateById(id, data) {
        const producto = new dtos_1.ProductoDto(data);
        return dao.updateById(id, producto);
    }
    deleteById(id) {
        return dao.deleteById(id);
    }
}
exports.ProductosService = ProductosService;
