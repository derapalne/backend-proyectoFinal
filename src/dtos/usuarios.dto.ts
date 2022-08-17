export class UsuarioDto {
    nombre: string;
    apellido: string;
    nombreCompleto: string;
    telefono: string;
    email: string;
    password: string;
    constructor(data: any) {
        this.nombre = data.nombre;
        this.apellido = data.apellido;
        this.nombreCompleto = `${data.nombre} ${data.apellido}`;
        this.telefono = data.telefono;
        this.email = data.email;
        this.password = data.password;
    }
}
