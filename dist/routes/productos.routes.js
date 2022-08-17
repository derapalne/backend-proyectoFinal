"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productosRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const productosRouter = (0, express_1.Router)();
exports.productosRouter = productosRouter;
const controller = new controllers_1.ProductosController();
// GET BY ID
productosRouter.get("/:id", controller.getById);
// POST PROD
productosRouter.post("/", controller.add);
// PUT PROD BY ID
productosRouter.put("/:id", controller.updateById);
// DELETE BY ID
productosRouter.delete("/:id", controller.deleteById);
