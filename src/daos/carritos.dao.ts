import mongoose from "mongoose";
import { CarritoModel } from "../models";
import { CarritoDto } from "../dtos";


export class CarritosDao {
    uri: string;
    constructor(uri: string) {
        this.uri = uri;
        mongoose.connect(this.uri);
    }

    async getByEmail(email: string): Promise<CarritoDto | undefined> {
        try {
            const carrito = await CarritoModel.findOne({ email: email }, { _id: 0, __v: 0 });
            if(carrito) return new CarritoDto(carrito);
            else return undefined;
        } catch (e) {
            return e;
        }
    }
    async getAll() {
        try {
            return await CarritoModel.find({}, { _id: 0, __v: 0 });
        } catch (e) {
            return e;
        }
    }

    async add(carrito: CarritoDto) {
        try {
            const data = new CarritoModel(carrito);
            return await data.save();
        } catch (e) {
            return e;
        }
    }

    async updateByEmail(email: string, carritoDto: CarritoDto) {
        try {
            return await CarritoModel.findOneAndUpdate(
                { email: email },
                { $set: { productos: carritoDto.productos } }
            );
        } catch (e) {
            return e;
        }
    }

    async deleteByEmail(email: string) {
        try {
            return await CarritoModel.deleteOne({ id: email });
        } catch (e) {
            return e;
        }
    }
}
