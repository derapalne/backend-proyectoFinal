import { config } from "../utils";
import { createTransport } from "nodemailer";
import { OrdenDto, UsuarioDto } from "../dtos";

const adminMail = config.ADMIN_MAIL;
const adminMailPass = config.ADMIN_MAIL_PASS;

const transporter = createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: adminMail,
        pass: adminMailPass,
    },
});

const sendRegisterMail = async (user: UsuarioDto) => {
    const mailOptions = {
        from: "Coderhouse Ecommerce",
        to: adminMail,
        subject: "Nuevo registro!",
        html: `<h1>Nuevo rsgistro: ${user.email}</h1>
                <p>Nombre: ${user.nombreCompleto}</p>
                <p>Direccion: ${user.direccion}</p>
                <p>Telefono: ${user.telefono}</p>
                <p>Email: ${user.email}</p>`,
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        console.log(error);
    }
};

const sendOrderMail = async (order: OrdenDto) => {
    let total = 0;
    let pedido = "";
    order.productos.forEach((p) => {
        pedido += `<p>${p.producto.nombre} - $${p.producto.precio.toLocaleString("ES")} x ${p.cantidad}</p>`;
        total += p.producto.precio * p.cantidad;
    });
    const mailOptions = {
        from: "Coderhouse Ecommerce",
        to: adminMail,
        subject: "Nuevo pedido! ID: " + order.ordenId,
        html: `<h1>Nuevo pedido: ${order.email}</h1>
                <p>Estado: ${order.estado}</p>
                <p>Fecha y hora: ${order.fyh}</p>
                ${pedido}
                <p>Total: $${total.toLocaleString("ES")}</p>`,
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        console.log(error);
    }
};

export { sendOrderMail, sendRegisterMail };
