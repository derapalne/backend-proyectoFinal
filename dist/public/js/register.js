const password1 = document.getElementById("inputPassword1");
const password2 = document.getElementById("inputPassword2");
const submitBtn = document.getElementById("submitBtn");
const passwordText = document.getElementById("passwordText");

password2.addEventListener("keyup", (e) => {
    if (password2.value != password1.value) {
        submitBtn.setAttribute("disabled", true);
        passwordText.innerText = "Las contraseñas deben coincidir!!!!";
    } else {
        submitBtn.removeAttribute("disabled");
        passwordText.innerText = "";
    }
});
