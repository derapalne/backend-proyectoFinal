import { MensajesDao } from "../daos";
import { MensajeDto } from "../dtos";

const dao = new MensajesDao("mongodb://127.0.0.1:27017/pfinal_db");

export class MensajesService {
    async getAll() {
        return await dao.getAll();
    }
    async add(data: any) {
        return await dao.add(new MensajeDto(data));
    }
}