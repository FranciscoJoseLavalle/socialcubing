document.querySelector('.form-login').addEventListener('submit', (e) => {
    e.preventDefault();
    const email1 = document.querySelector('#inputEmail')
    const password1 = document.querySelector('#inputPassword')
    const h2 = document.querySelector('h2');

    let email = email1.value
    let password = password1.value

    let obj = { email, password }
    fetch('/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(result => result.json()).then(json => {
        console.log(json);
        if (json.status) {
            sessionStorage.setItem('user', JSON.stringify({ userId: json.userId, userName: json.userName }))
            window.location.replace("/");
        } else {
            h2.textContent = "Iniciar sesión - Datos inválidos"
        }
    })
})