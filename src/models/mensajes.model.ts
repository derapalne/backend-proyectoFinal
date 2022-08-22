import { Schema, model } from "mongoose";
import { IMensaje } from "../interfaces";

const MensajesSchema = new Schema<IMensaje>({
    email: { type: String, required: true },
    fyh: { type: String, required: true },
    cuerpo: { type: String, required: true },
});

const MensajesModel = model<IMensaje>("Mensaje", MensajesSchema);

export { MensajesSchema, MensajesModel };
