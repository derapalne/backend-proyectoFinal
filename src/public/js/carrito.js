const eliminar = document.getElementsByClassName("eliminar");
const recargar = document.getElementById("recargar");

const url = "http://127.0.0.1:7777/api/carritos/";

for (let i = 0; i < eliminar.length; i++) {
    const botonEliminar = eliminar.item(i);
    botonEliminar.addEventListener("click", (e) => {
        const idEliminar = botonEliminar.previousElementSibling;
        const email = idEliminar.previousElementSibling;
        // console.log(url + idEliminar.value);
        fetch(url + idEliminar.value, {
            method: "DELETE",
            body: JSON.stringify({ email: email.value }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(() => {
            recargar.click();
        });
    });
}
