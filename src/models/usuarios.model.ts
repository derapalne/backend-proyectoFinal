import { Schema, model } from "mongoose";
import { IUsuario } from "../interfaces";
import bcrypt from "bcrypt";

const UsuariosSchema = new Schema<IUsuario>({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    telefono: {type: String, required: true},
    direccion: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
});

UsuariosSchema.pre<IUsuario>('save', async function (next) {
        const user = this;
        if(!user.isModified('password')) return next();
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        next()
});

const UsuarioModel = model<IUsuario>("Usuario", UsuariosSchema);

export {UsuarioModel, UsuariosSchema};