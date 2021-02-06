document.addEventListener('DOMContentLoaded', function () {
    const btnLogin = document.getElementById("btnLogin")

    btnLogin.addEventListener('click', function () {
        const username = document.getElementById("inputUser")
        const password = document.getElementById("inputPassword")

        if (username.value === "admin" && password.value === "admin") {
            //logar

            localStorage.setItem("acesso", true)
            window.location.href = "../view/calendar.html"
            
        } else {
            alert("Usuário ou Senha Inválidos!")
        }

    })
})