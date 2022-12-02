document.addEventListener('DOMContentLoaded', () => {
    const usersContainer = document.querySelector('.users');

    const user = sessionStorage.getItem('user');

    fetch('/explorar/getUsers', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }).then(result => result.json()).then(json => {
        json.forEach(user => {
            const div = document.createElement('div');
            const h2 = document.createElement('h2');
            const button = document.createElement('button');

            div.classList.add('user');

            h2.textContent = user.name
            button.textContent = `Add friend`
            
            // button.onclick = () => {
            //     let obj = {userId: user._id}
            //     fetch('/explorar/getUsers', {
            //         method: 'PUT',
            //         body: JSON.stringify(obj),
            //         headers: {
            //             "Content-Type": "application/json"
            //         }
            //     }).then(result => result.json()).then(json => console.log(json))
            // }

            div.append(h2);
            div.append(button);
            usersContainer.append(div);
        })
    }).finally(data => console.log(data))
})