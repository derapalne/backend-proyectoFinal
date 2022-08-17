"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductosController = void 0;
const services_1 = require("../services");
const service = new services_1.ProductosService();
class ProductosController {
    getById(req, res) {
        const id = req.params.id;
        res.json(service.getById(id));
    }
    add(req, res) {
        const data = req.body;
        res.json(service.add(data));
    }
    updateById(req, res) {
        const id = req.params.id;
        const data = req.body;
        res.json(service.updateById(id, data));
    }
    deleteById(req, res) {
        const id = req.params.id;
        res.json(service.deleteById(id));
    }
}
exports.ProductosController = ProductosController;
