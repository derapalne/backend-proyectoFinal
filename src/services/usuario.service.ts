import { UsuariosDao } from "../daos";
import { UsuarioDto } from "../dtos";
import { config } from "../utils";

const dao = new UsuariosDao(config.mongoUri);

export class UsuariosService {
    async getByEmail(email: string): Promise<UsuarioDto | null> {
        try {
            return await dao.getByEmail(email);
        } catch (e) {
            return e;
        }
    }
    async add(data: any) {
        try {
            const usuario: UsuarioDto = new UsuarioDto(data);
            return await dao.add(usuario);
        } catch (e) {
            return e;
        }
    }
}
