let loginInput = document.querySelector('.login');
let passwordInput = document.querySelector('.password');
let btnSend = document.querySelector('.btn');
let info = document.getElementById('info');
let btnExitAccount = document.querySelector('.btn-exit');

let login;
let password;

if(localStorage != 0)



function sendForm() {
    login = loginInput.value;
    password = passwordInput.value;

    let user = {
        login, password
    };

    if(login === 'dick' && password === '123') {

        info.innerHTML = "Correct";
        localStorage.setItem('user1', JSON.stringify(user));
        btnExitAccount.innerHTML = "X";

    }  else if(login === '', password === '') { 
        info.innerHTML = "Empty";
    } else {
        info.innerHTML = "Invalid login and password";
    }

}

btnSend.addEventListener('click', () => {
    sendForm();

});

function clearForm() {
    loginInput.value = "";
    passwordInput.value = "";
    info.innerHTML = "Welcome";
}

btnExitAccount.addEventListener('click', () => {
    localStorage.clear();
    clearForm();
    btnExitAccount.innerHTML = "";
})