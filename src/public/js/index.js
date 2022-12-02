document.addEventListener('DOMContentLoaded', () => {
    const userButtons = document.querySelector('.header__nav-links-user');
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
        userButtons.textContent = ''
        const button = document.createElement('button');
        const a = document.createElement('a');
        const p = document.createElement('p');

        p.textContent = `Bienvenido ${user.userName}!`
        button.textContent = "Logout"
        button.classList.add('btn');

        button.onclick = () => {
            sessionStorage.clear();
        }
        a.setAttribute('href', '/')

        a.append(button);

        userButtons.append(p)
        userButtons.append(a)
    }
})