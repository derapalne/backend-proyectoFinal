import { MensajesDao } from "../daos";
import { MensajeDto } from "../dtos";
import { config } from "../utils";

const dao = new MensajesDao(config.MONGO_URI);

export class MensajesService {
    async getAll() {
        try {
            return await dao.getAll();
        } catch (e) {
            return e;
        }
    }
    async getByEmail(email: string) {
        try {
            return await dao.getByEmail(email);
        } catch (e) {
            return e;
        }
    }
    async add(data: any) {
        try {
            return await dao.add(new MensajeDto(data));
        } catch (e) {
            return e;
        }
    }
}
