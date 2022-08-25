import { MensajesDao } from "../daos";
import { MensajeDto } from "../dtos";
import { config } from "../utils";

const dao = new MensajesDao(config.mongoUri);

export class MensajesService {
    async getAll() {
        return await dao.getAll();
    }
    async getByEmail(email: string) {
        return await dao.getByEmail(email);
    }
    async add(data: any) {
        return await dao.add(new MensajeDto(data));
    }
}