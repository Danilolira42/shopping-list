const email = document.getElementById("email");
const password = document.getElementById("password");

email.addEventListener("invalid", function (event) {
    event.preventDefault()

    const alert = document.createElement("span");
    const footer = document.getElementById("footer");

    alert.textContent = "Por favor, insira um e-mail válido!";

    footer.classList.add("Email");
    footer.classList.add("invalidEmail");

    footer.appendChild(alert);

    setTimeout(() => {

        footer.removeChild(alert);
        footer.classList.remove("Email");
        footer.classList.add("invalidEmail");

        alert.textContent = "";
    }, 1000);

    console.log(alert)

})

const submit = document.getElementById("form");

submit.addEventListener("submit", function (event) {
    event.preventDefault()

    //API de autenticação

    if(email.value == "" || password.value == "") {

    const alert = document.createElement("span");
    const footer = document.getElementById("footer");

    alert.textContent = "Por favor, insira seu email ou senha!";

    footer.classList.add("Email");
    footer.classList.add("invalidEmail");

    footer.appendChild(alert);

    setTimeout(() => {  
        footer.removeChild(alert);
        footer.classList.remove("Email");
        footer.classList.add("invalidEmail");

        alert.textContent = "";
    }, 1000)
    return };

    //Aqui recebe minhas API de autenticação
    window.location.href = "/products/index.html"
});

password.addEventListener("invalid", function (event) {
    event.preventDefault()
    const alert = document.createElement("span");
    const footer = document.getElementById("footer");
    alert.textContent = "Por favor, insira sua senha!";

    footer.classList.add("Password");
    footer.classList.add("invalidEmail");
    footer.appendChild(alert);

    setTimeout(() => {
        footer.removeChild(alert);
        footer.classList.remove("Password");
        footer.classList.remove("invalidEmail");
        alert.textContent = "";
    }
    , 1000);

    return;
    console.log (alert)

})

    password.addEventListener("input", function (event) {       
    const footer = document.getElementById("footer");
    footer.classList.remove("invalidEmail");
    });
