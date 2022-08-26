const boton = document.getElementById("redirigir");

document.cookie = "userInfo" + "=; Max-Age=0";

const redirigir = () => {
    boton.click();
};

setTimeout(redirigir, 1000);
