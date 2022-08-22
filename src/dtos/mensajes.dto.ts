export class MensajeDto {
    email: string;
    fyh: string;
    cuerpo: string;
    constructor(data: any) {
        this.email = data.email;
        this.fyh = data.fyh;
        this.cuerpo = data.cuerpo;
    }
}