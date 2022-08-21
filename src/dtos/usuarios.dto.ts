import bcrypt from "bcrypt";

export class UsuarioDto {
    nombre: string;
    apellido: string;
    nombreCompleto: string;
    telefono: string;
    direccion: string;
    email: string;
    password: string;
    constructor(data: any) {
        this.nombre = data.nombre;
        this.apellido = data.apellido;
        this.nombreCompleto = `${data.nombre} ${data.apellido}`;
        this.telefono = data.telefono;
        this.direccion = data.direccion;
        this.email = data.email;
        this.password = data.password;
    }
}
