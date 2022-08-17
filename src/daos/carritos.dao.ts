import mongoose from "mongoose";
import { CarritoModel } from "../models";
import { CarritoDto, ProductoDto } from "../dtos";

export class CarritosDao {
    uri: string;
    constructor(uri: string) {
        this.uri = uri;
    }

    async getByEmail(email: string) {
        try {
            await mongoose.connect(this.uri);
            return await CarritoModel.findOne({ email: email }, { _id: 0, __v: 0 });
        } catch (e) {
            return e;
        }
    }
    async getAll() {
        try {
            await mongoose.connect(this.uri);
            return await CarritoModel.find({}, { _id: 0, __v: 0 });
        } catch (e) {
            return e;
        }
    }
    async add(carrito: CarritoDto) {
        try {
            await mongoose.connect(this.uri);
            const data = new CarritoModel(carrito);
            return await data.save();
        } catch (e) {
            return e;
        }
    }

    async addProductoByEmail(email: string, producto: ProductoDto) {
        try {
            await mongoose.connect(this.uri);
            const carrito = await CarritoModel.findOne({email: email});
            carrito.productos.push(producto);
            return await CarritoModel.findOneAndReplace({email: email}, carrito);
        } catch (e) {
            return e;
        }
    }

    async deleteByEmail(email: string) {
        try {
            await mongoose.connect(this.uri);
            return await CarritoModel.deleteOne({ id: email });
        } catch (e) {
            return e;
        }
    }
}
