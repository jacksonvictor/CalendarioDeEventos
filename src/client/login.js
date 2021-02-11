document.addEventListener('DOMContentLoaded', function () {

    alertify.set('notifier','position', 'top-right');

    const btnLogin = document.getElementById("btnLogin")
    const btnSaveUser = document.getElementById("btnSaveUser")
    const btnNewUser = document.getElementById('btnNewUser')



    btnNewUser.addEventListener('click', () => {
        const modalNewUser = new bootstrap.Modal(document.getElementById('modalNewUser'))
        modalNewUser.show()

    })

    btnLogin.addEventListener('click', () => {
        const username = document.getElementById("inputUser")
        const password = document.getElementById("inputPassword")


        fetch('http://localhost:3000/users')
            .then(response => response.json())

            .then(users => {
                let login = 0
                let id = null
                users.forEach(user => {
                    if (username.value === user.USERNAME && password.value === user.PASS) {
                        login++
                        id = user.ID
                    }
                })

                if (login > 0){
                    localStorage.setItem("id", id)
                    window.location.href = "./calendar.html"
                } else {
                    alertify.error('Usuário e/ou Senha Incorretos!')
                }
            })





    })

    btnSaveUser.addEventListener('click', () => {

        const USERNAME = document.getElementById("inputUserModal")
        const PASS = document.getElementById("inputPasswordModal")

        if (USERNAME.value === "" || PASS.value === "") {
            alertify.error('Todos os campos são obrigatórios!')

        } else {
            fetch('http://localhost:3000/users')
                .then(response => response.json())

                .then(users => {
                    let userExistent = users.filter(u => u.USERNAME === USERNAME.value)

                    if (userExistent.length === 0) {
                        const user = {
                            USERNAME: USERNAME.value,
                            PASS: PASS.value
                        }

                        request('POST', 'http://localhost:3000/users', user)
                            .then(data => console.log(data))
                            .catch(error => console.error(error))

                        alertify.success('Usuário Cadastrado com sucesso')
                    } else {
                        alertify.error('Usuário já cadastrado!')

                    }
                })
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