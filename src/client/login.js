document.addEventListener('DOMContentLoaded', function () {
    const btnLogin = document.getElementById("btnLogin")

    const btnNewUser = document.getElementById('btnNewUser')
    

    btnNewUser.addEventListener('click', () => {
        const modalNewUser = new bootstrap.Modal(document.getElementById('modalNewUser'))
        modalNewUser.show()

    })

    btnLogin.addEventListener('click',  () => {
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