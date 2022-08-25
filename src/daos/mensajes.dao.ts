import mongoose from "mongoose";
import { MensajesModel } from "../models";
import { MensajeDto } from "../dtos";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

export class MensajesDao {
    uri: string;
    constructor(uri: string) {
        this.uri = uri;
        mongoose.connect(this.uri);
    }
    async getAll() {
        try {
            return await MensajesModel.find({}, { _id: 0, __v: 0 });
        } catch (e) {
            return e;
        }
    }
    async getByEmail(email: string) {
        try {
            return await MensajesModel.find({email: email}, { _id: 0, __v: 0 });
        } catch (e) {
            return e;
        }
    }
    
    async add(mensaje: MensajeDto) {
        try {
            const data = new MensajesModel(mensaje);
            return await data.save();
        } catch (e) {
            return e;
        }
    }
}
