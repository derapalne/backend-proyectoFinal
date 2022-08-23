import { MensajesDao } from "../daos";
import { MensajeDto } from "../dtos";
import { config } from "../utils";

const dao = new MensajesDao(config.mongoUri);

export class MensajesService {
    async getAll() {
        return await dao.getAll();
    }
    async add(data: any) {
        return await dao.add(new MensajeDto(data));
    }
}