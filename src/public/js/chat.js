const socket = io();

const cuerpoMensaje = document.getElementById("cuerpoMensaje");
const enviarMensaje = document.getElementById("enviarMensaje");
const chat = document.getElementById("chat");
const email = document.getElementById("email");

// agregar funcionalidad de mandar chat / recibir actualizaciones en tiempo real

cuerpoMensaje.addEventListener("keypress", (e) => {
    if (e.key == "Enter") enviarMensaje.click();
});

enviarMensaje.addEventListener("click", (e) => {
    e.preventDefault();
    if (cuerpoMensaje.value.trim() != "" && cuerpoMensaje.value != null) {
        const d = new Date();
        const nuevoMensaje = {
            email: email.value,
            fyh: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}-${Date(Date.now())
                .toLocaleLowerCase("es")
                .slice(16, 24)}`,
            cuerpo: cuerpoMensaje.value,
        };
        socket.emit("mensajeEnviado", nuevoMensaje);
        cuerpoMensaje.value = "";
    }
});

socket.on("chatRefresh", (mensaje) => {
    const nuevoMensaje = document.createElement("tr");
    nuevoMensaje.innerHTML = `
    <td colspan="1" style="text-align: left;">
      ${mensaje.email}
    </td>
    <td colspan="1" style="text-align: left;">
      ${mensaje.fyh} ::
    </td>
    <td colspan="3" style="text-align: left;">
      ${mensaje.cuerpo}
    </td>`;
    chat.appendChild(nuevoMensaje);
});
