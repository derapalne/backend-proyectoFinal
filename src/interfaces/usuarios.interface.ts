import { Document } from "mongoose";

export interface IUsuario extends Document {
    nombre: string;
    apellido: string;
    telefono: string;
    direccion: string;
    email: string;
    password: string;
}
