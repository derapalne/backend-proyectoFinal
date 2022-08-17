import mongoose from "mongoose";
import { ProductoModel } from "../models";
import { ProductoDto } from "../dtos";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

export class ProductosDao {
    uri: string;
    constructor(uri: string) {
        this.uri = uri;
    }

    async getById(id: string) {
        try {
            await mongoose.connect(this.uri);
            return await ProductoModel.findOne({id: id}, {_id: 0, __v:0});
        } catch (e) {
            return e;
        }
    }
    async getAll() {
        try {
            await mongoose.connect(this.uri);
            return await ProductoModel.find({}, {_id: 0, __v:0});
        } catch (e) {
            return e;
        }
    }
    async add(producto: ProductoDto) {
        try {
            await mongoose.connect(this.uri);
            const largestId = await ProductoModel.find({},{_id : 0, id: 1}).sort({id: -1}).limit(1);
            if(largestId[0]) producto.id = largestId[0].id+ 1;
            else producto.id = 0;
            const data = new ProductoModel(producto);
            return await data.save()
        } catch (e) {
            return e;
        }
    }
    async updateById(id: string, producto: ProductoDto) {
        try {
            await mongoose.connect(this.uri);
            return await ProductoModel.updateOne({id: id}, producto);
        } catch (e) {
            return e;
        }
    }
    async deleteById(id: string) {
        try {
            await mongoose.connect(this.uri);
            return await ProductoModel.deleteOne({id: id});
        } catch (e) {
            return e;
        }
    }
}
