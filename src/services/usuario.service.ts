import { UsuariosDao } from "../daos";
import { UsuarioDto } from "../dtos";
import { config } from "../utils";

const dao = new UsuariosDao(config.mongoUri);

export class UsuariosService {
    async getByEmail(email: string): Promise<UsuarioDto | null> {
        return await dao.getByEmail(email);
    }
    async add(data: any) {
        const usuario: UsuarioDto = new UsuarioDto(data);
        return await dao.add(usuario);
    }
}