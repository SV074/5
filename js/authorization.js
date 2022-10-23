let loginInput = document.querySelector('.login');
let passwordInput = document.querySelector('.password');
let btnSend = document.querySelector('.btn');
let info = document.getElementById('info');

let login;
let password;





function sendForm() {
    login = loginInput.value;
    password = passwordInput.value;

    let user = {
        login, password
    };

    if(login === 'dick', password === '123') {

        info.innerHTML = "Correct";
        localStorage.setItem('user1', JSON.stringify(user));

    }  else if(login === '', password === '') { 
        info.innerHTML = "Empty";
    } else {
        info.innerHTML = "Invalid login and password";
    }

}

btnSend.addEventListener('click', () => {
    
    console.log(sendForm);
    sendForm();

});