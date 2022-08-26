import mongoose from "mongoose";
import { UsuarioModel } from "../models";
import { UsuarioDto } from "../dtos";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

export class UsuariosDao {
    uri: string;
    constructor(uri: string) {
        this.uri = uri;
        mongoose.connect(this.uri);
    }

    async getByEmail(email: string) {
        try {
            return await UsuarioModel.findOne({ email: email }, { _id: 0, __v: 0 });
        } catch (e) {
            return e;
        }
    }
    async getAll() {
        try {
            return await UsuarioModel.find({}, { _id: 0, __v: 0 });
        } catch (e) {
            return e;
        }
    }
    async add(usuario: UsuarioDto) {
        try {
            const data = new UsuarioModel(usuario);
            return await data.save();
        } catch (e) {
            return e;
        }
    }
    async updateByEmail(email: string, usuario: UsuarioDto) {
        try {
            return await UsuarioModel.updateOne({ email: email }, usuario);
        } catch (e) {
            return e;
        }
    }
    async deleteByEmail(email: string) {
        try {
            return await UsuarioModel.deleteOne({ email: email });
        } catch (e) {
            return e;
        }
    }
}
