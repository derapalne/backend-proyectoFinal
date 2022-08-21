import { UsuariosDao } from "../daos";
import { UsuarioDto } from "../dtos";

const dao = new UsuariosDao("mongodb://127.0.0.1:27017/pfinal_db");

export class UsuariosService {
    async getByEmail(email: string): Promise<UsuarioDto | null> {
        return await dao.getByEmail(email);
    }
    async add(data: any) {
        const usuario: UsuarioDto = new UsuarioDto(data);
        return await dao.add(usuario);
    }
}