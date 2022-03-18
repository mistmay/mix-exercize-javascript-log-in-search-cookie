import {
    User
} from "./constants.js";

export function switchPage(boolean = true) {
    document.querySelector('form').style.display = boolean ? 'none' : 'flex';
    document.getElementById('todo-list').style.display = boolean ? 'flex' : 'none';
}

export async function generateTodoPage() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const todoJson = await response.json();
        todoJson.slice(0, 10).forEach(element => {
            const p = document.createElement('p');
            p.innerText = element.title;
            document.getElementById('todo-list').prepend(p);
        });
    } catch (error) {
        console.log(error);
    }
}

export function logOut() {
    document.querySelectorAll('#todo-list>p').forEach(element => {
        element.remove();
    });
    document.cookie = "logged=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log('ciao');
    switchPage(false);
}

export async function logIn() {
    const inputUserName = document.getElementById('username').value;
    const inputPassword = document.getElementById('password').value;
    if (inputUserName === '' || inputPassword === '') {
        alert('Fill all Datas');
        return;
    }
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const userJson = await response.json();
        const userArray = userJson.map(element => new User(element.username, element.address.city));
        const currentUser = userArray.find(element => element.username === inputUserName && element.password === inputPassword);
        if (!currentUser) {
            alert('Wrong Datas');
            return;
        } else {
            document.cookie = "logged=true";
            generateTodoPage();
            switchPage();
        }
    } catch (error) {
        console.log(error);
    }
}