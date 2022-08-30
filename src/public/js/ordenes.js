const cambiarEstado = document.getElementsByClassName("botonCambiarEstado");
const recargar = document.getElementById("recargar");

const url = "http://127.0.0.1:7777/api/ordenes/";

for (let i = 0; i < cambiarEstado.length; i++) {
    const botonEliminar = cambiarEstado.item(i);
    botonEliminar.addEventListener("click", (e) => {
        const estado = botonEliminar.previousElementSibling;
        const id = estado.previousElementSibling;
        fetch(url, {
            mode: "cors",
            method: "PUT",
            body: JSON.stringify({ estado: estado.value, id: id.value }),
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": "true",
            },
        }).then((res) => {
            recargar.click();
        });
    });
}
