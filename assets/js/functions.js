import {
    hexCharacters,
    userArray,
    noResult
} from "./constants.js";

const currentArray = [...userArray];
let counter = 0;

function generateColour() {
    let hexCode = '#';
    for (let i = 0; i < 6; i++) {
        let index = Math.floor(Math.random() * hexCharacters.length);
        hexCode += hexCharacters[index];
    }
    return hexCode;
}

export function changeColour() {
    let hexCode = generateColour();
    document.querySelector('body').style.backgroundColor = hexCode;
    document.querySelector('#nav-left>h3>span').innerText = hexCode;
}

export function counterFunction(operation) {
    switch (operation) {
        case 'plus':
            counter++;
            break;
        case 'minus':
            counter--;
            break;
        case 'reset':
            counter = 0;
            break;
    }
    document.querySelector('#nav-right>h3>span').innerText = `${counter}`;
}

export function expand(boolean = true) {
    const paragraph = document.querySelector('#expanding-container>p');
    const lorem = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. In doloribus laboriosam aut ut earum iure impedit dolor mollitia pariatur accusamus excepturi quasi, deserunt eaque neque numquam quod corporis ullam tempora!';
    boolean ? paragraph.innerText += '\n' + lorem : paragraph.innerText = lorem;
}

function addZero(number) {
    if (number < 10) {
        return `0${number}`;
    } else {
        return String(number);
    }
}

export function clock() {
    const today = new Date();
    document.querySelector('#nav-center>span').innerText = `${addZero(today.getHours())}:${addZero(today.getMinutes())}:${addZero(today.getSeconds())}`;
}

export function changeClockBackground() {
    document.getElementById('nav-center').style.backgroundColor = generateColour();
}

function deleteUser(id) {
    currentArray.splice(id, 1);
    if (currentArray.length !== 0) {
        generateUsers();
    } else {
        generateUsers(noResult);
    }
}

export function generateUsers(array = currentArray) {
    document.querySelectorAll('.user').forEach(element => {
        element.remove();
    });
    let idNumber = 0;
    array.forEach(element => {
        const div = document.createElement('div');
        div.setAttribute('class', 'user');
        const name = document.createElement('h1');
        name.innerText = element.name;
        div.append(name);
        if (JSON.stringify(array) === JSON.stringify(currentArray)) {
            const btn = document.createElement('button');
            btn.setAttribute('type', 'button');
            btn.setAttribute('class', 'nav-btn delete-btn');
            btn.setAttribute('id', String(idNumber));
            btn.innerText = 'X';
            div.append(btn);
        }
        document.getElementById('user-container').append(div);
        idNumber++;
    });
    if (JSON.stringify(array) === JSON.stringify(currentArray)) {
        document.querySelectorAll('.delete-btn').forEach(element => {
            element.onclick = function () {
                deleteUser(Number(element.id));
            }
        });
    }
}

export function search(value) {
    if (currentArray.length === 0) {
        return;
    }
    if (value === '') {
        generateUsers();
    } else {
        const result = currentArray.filter(element => element.name.toLowerCase().includes(value.toLowerCase()));
        if (result.length === 0) {
            generateUsers(noResult);
        } else {
            generateUsers(result);
        }
    }
}

function wordsCounter(string) {
    const result = {};
    const punct = `\.,-/#!$%^&*;:{}=-_~()'"'`.split('');
    let stringNoPunct = '';
    string.toLowerCase().split('').forEach(element => {
        let check = true;
        punct.forEach(item => {
            if (element === item) {
                check = false;
            }
        });
        if (check) {
            stringNoPunct += element;
        }
    });
    const arrayFromString = stringNoPunct.replace('\n', ' ').split(' ');
    arrayFromString.forEach(element => {
        if (element !== '') {
            let counter = 0;
            arrayFromString.forEach(item => {
                if (element === item) {
                    counter++;
                }
            });
            result[element] = counter;
        }
    });
    return Object.entries(result);
}

export function showWordsCounter(string) {
    if (string === '') {
        alert('Please Insert Some Text');
        return;
    }
    document.querySelectorAll('#word-counter-container>div>p').forEach(element => {
        element.remove();
    });
    const result = wordsCounter(string);
    if (result.length === 0) {
        const p = document.createElement('p');
        p.innerText = 'No Valid Words';
        document.querySelector('#word-counter-container>div').append(p);
    } else {
        result.forEach(element => {
            const p = document.createElement('p');
            p.innerText = `${element[0]} : ${element[1]}`;
            document.querySelector('#word-counter-container>div').append(p);
        });
    }
}