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
        
        const username = document.getElementById("inputUser").value
        const pass = document.getElementById("inputPassword").value

        const user = {
            USERNAME: username,
            PASS: pass
        }

        request('POST', 'http://localhost:3000/users/login', user)
            
            .then(res => {
                 if (res.status === 200){
                    localStorage.setItem("id", res.id)
                    window.location.href = "./calendar.html"
                } else {
                    alertify.error('Usuário e/ou Senha Incorretos!')
                } 
            })
    })

    btnSaveUser.addEventListener('click', () => {

        const USERNAME = document.getElementById("inputUserModal")
        const PASS = document.getElementById("inputPasswordModal")

        const user = {
            USERNAME: USERNAME.value,
            PASS: PASS.value
        }

        if (USERNAME.value === "" || PASS.value === "") {
            alertify.error('Todos os campos são obrigatórios!')

        } else {
            request('POST', 'http://localhost:3000/users/searchByUser', user)
                .then(res => {
                    if (res.status === 404) {
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