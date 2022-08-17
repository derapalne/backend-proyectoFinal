"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductosDao = void 0;
class ProductosDao {
    getById(id) {
        return "GetById";
    }
    getAll() {
        return "GetAll";
    }
    add(producto) {
        return "Add";
    }
    updateById(id, producto) {
        return "UpdateById";
    }
    deleteById(id) {
        return "DeleteById";
    }
}
exports.ProductosDao = ProductosDao;
