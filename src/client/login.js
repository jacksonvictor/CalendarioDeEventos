document.addEventListener('DOMContentLoaded', function () {


    const btnLogin = document.getElementById("btnLogin")
    const btnSaveUser = document.getElementById("btnSaveUser")
    const btnNewUser = document.getElementById('btnNewUser')
    let users = []
    fetch('http://localhost:8080/')
        .then(response => response.json())

        .then(data => {

            users = data

        })


    btnNewUser.addEventListener('click', () => {
        const modalNewUser = new bootstrap.Modal(document.getElementById('modalNewUser'))
        modalNewUser.show()

    })

    btnLogin.addEventListener('click', () => {
        const username = document.getElementById("inputUser")
        const password = document.getElementById("inputPassword")

        users.forEach(user => {
            if (username.value === user.USERNAME && password.value === user.PASS) {
                localStorage.setItem("id", user.ID)

                window.location.href = "./calendar.html"
            }
        })



    })

    btnSaveUser.addEventListener('click', () => {

        const USERNAME = document.getElementById("inputUserModal")
        const PASS = document.getElementById("inputPasswordModal")
        const message = document.getElementById("message")

        let userExistent = users.filter(u =>u.USERNAME === USERNAME.value)

        if(userExistent.length === 0){
            const user = {
                USERNAME: USERNAME.value,
                PASS: PASS.value
            }
    
            request('POST', 'http://localhost:8080/new-user', user)
                .then(data => console.log(data))
                .catch(error => console.error(error))
    
            message.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">Usuário cadastrado com sucesso!<button type="button" class="close" data-dismiss="alert" aria-label="Close"></button></div>`
        }else{
            message.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">Usuário já cadastrado!<button type="button" class="close" data-dismiss="alert" aria-label="Close"></div>`

        }
        

    })

})

function request(method, url, data) {
    return fetch(url, {
            credentials: 'same-origin',
            method: method,
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        })
        .then(response => response.json())
}
