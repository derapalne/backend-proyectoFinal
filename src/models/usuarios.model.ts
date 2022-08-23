import { Schema, model } from "mongoose";
import { IUsuario } from "../interfaces";

const UsuariosSchema = new Schema<IUsuario>({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    telefono: {type: String, required: true},
    direccion: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
});

const UsuarioModel = model<IUsuario>("Usuario", UsuariosSchema);

export {UsuarioModel, UsuariosSchema};