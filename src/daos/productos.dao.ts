import mongoose from "mongoose";
import { ProductoModel } from "../models";
import { ProductoDto } from "../dtos";
import { logger } from "../utils";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

export class ProductosDao {
    uri: string;
    constructor(uri: string) {
        this.uri = uri;
        mongoose.connect(this.uri);
    }

    async getById(id: string) {
        try {
            return await ProductoModel.findOne({ id: id }, { _id: 0, __v: 0 });
        } catch (e) {
            return e;
        }
    }
    async getByCategory(categoria: string) {
        try {
            return await ProductoModel.find({ categoria: categoria }, { _id: 0, __v: 0 });
        } catch (e) {
            return e;
        }
    }
    async getAll() {
        try {
            return await ProductoModel.find({}, { _id: 0, __v: 0 });
        } catch (e) {
            return e;
        }
    }
    async add(producto: ProductoDto) {
        try {
            await mongoose.connect(this.uri);
            // Buscar todas las IDs de productos, ordenar por ID descendente y traer solamente el primero
            const largestId = await ProductoModel.find({}, { _id: 0, id: 1 }).sort({ id: -1 }).limit(1);
            // Si el ID es mayor a 0 (es decir, no es el primer producto agregado),
            // sumar 1 al ID anterior.
            if (largestId[0] && largestId[0].id >= 0) producto.id = largestId[0].id + 1;
            // Si no, que el producto sea el primero.
            else {
                producto.id = 0;
            }
            const data = new ProductoModel(producto);
           return await data.save();
        } catch (e) {
            return e;
        }
    }
    async updateById(id: string, producto: ProductoDto) {
        try {
            return await ProductoModel.updateOne({ id: id }, producto);
        } catch (e) {
            return e;
        }
    }
    async deleteById(id: string) {
        try {
            return await ProductoModel.deleteOne({ id: id });
        } catch (e) {
            return e;
        }
    }
}
