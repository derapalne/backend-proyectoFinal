import mongoose from "mongoose";
import { OrdenModel } from "../models";
import { OrdenDto } from "../dtos";
import { IOrden } from "../interfaces";

export class OrdenesDao {
    uri: string;
    constructor(uri: string) {
        this.uri = uri;
        mongoose.connect(this.uri);
    }

    async getByEmail(email: string): Promise<OrdenDto[] | undefined> {
        try {
            const orden = await OrdenModel.find({ email: email }, { _id: 0, __v: 0 });
            if (orden) {
                const ordenes = [];
                orden.forEach((o) => {
                    ordenes.push(new OrdenDto(o));
                });
                return ordenes;
            } else return undefined;
        } catch (e) {
            return e;
        }
    }

    async getByOrdenId(id: number): Promise<OrdenDto | undefined> {
        try {
            const orden = await OrdenModel.findOne({ ordenId: id }, { _id: 0, __v: 0 });
            if (orden) return new OrdenDto(orden);
            else return undefined;
        } catch (e) {
            return e;
        }
    }

    async getAll() {
        try {
            return await OrdenModel.find({}, { _id: 0, __v: 0 });
        } catch (e) {
            return e;
        }
    }

    async add(orden: OrdenDto) {
        try {
            const data = new OrdenModel(orden);
            return await data.save();
        } catch (e) {
            return e;
        }
    }

    async updateById(id: number, ordenDto: OrdenDto) {
        try {
            return await OrdenModel.findOneAndUpdate(
                { email: email },
                { $set: { productos: ordenDto.productos } }
            );
        } catch (e) {
            return e;
        }
    }

    async deleteByEmail(email: string) {
        try {
            return await OrdenModel.deleteOne({ id: email });
        } catch (e) {
            return e;
        }
    }
}
