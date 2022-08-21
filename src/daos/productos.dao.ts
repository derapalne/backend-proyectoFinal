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
    async getByCategory(categoria: string) {
        try {
            await mongoose.connect(this.uri);
            return await ProductoModel.find({categoria: categoria}, {_id: 0, __v:0});
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
            // console.log("hola agregando productos");
            await mongoose.connect(this.uri);
            const largestId = await ProductoModel.find({},{_id : 0, id: 1}).sort({id: -1}).limit(1);
            // console.log("largestId[0]",largestId[0]);
            if(largestId[0].id >= 0) producto.id = largestId[0].id+ 1;
            else producto.id = 0;
            // console.log("producto desde DAO:", producto);
            const data = new ProductoModel(producto);
            return await data.save()
        } catch (e) {
            return e;
        }
    }
    async updateById(id: string, producto: ProductoDto) {
        try {
            console.log("producto desde el DAO:", producto, id);
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
