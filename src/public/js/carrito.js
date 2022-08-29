const eliminar = document.getElementsByClassName("eliminar");
const recargar = document.getElementById("recargar");
const noProductos = document.getElementById("noProductos");
const comprar = document.getElementById("hacerCompra");

// Si existe este elemento se desactiva la opcion de hacer una compra para que no haya ordenes vacias
if(noProductos) comprar.setAttribute("disabled", true);

const url = "http://127.0.0.1:7777/api/carritos/";

for (let i = 0; i < eliminar.length; i++) {
    const botonEliminar = eliminar.item(i);
    botonEliminar.addEventListener("click", (e) => {
        const idEliminar = botonEliminar.previousElementSibling;
        const email = idEliminar.previousElementSibling;
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
