import {
    changeColour,
    counterFunction,
    expand,
    search,
    clock,
    generateUsers,
    changeClockBackground,
    showWordsCounter
} from "./functions.js";

import {
    logIn,
    logOut,
    generateTodoPage,
    switchPage
} from "./log-in.js";

document.getElementById('change-background-btn').addEventListener('click', () => changeColour());
document.getElementById('counter-plus-btn').addEventListener('click', () => counterFunction('plus'));
document.getElementById('counter-minus-btn').addEventListener('click', () => counterFunction('minus'));
document.getElementById('counter-reset-btn').addEventListener('click', () => counterFunction('reset'));
document.getElementById('expand-btn').addEventListener('click', () => expand());
document.getElementById('reset-expand-form-btn').addEventListener('click', () => expand(false));
document.querySelector('input').addEventListener('input', () => search(document.querySelector('input').value.trim()));
document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    logIn();
});
document.getElementById('logout-btn').addEventListener('click', () => logOut());
document.getElementById('word-btn').addEventListener('click', () => showWordsCounter(document.querySelector('#word-counter-container>input').value.trim()));


window.addEventListener('DOMContentLoaded', () => {
    clock();
    setInterval(clock, 1000);
    generateUsers();
});

window.addEventListener('load', () => {
    if (document.cookie.includes('logged=true')) {
        generateTodoPage();
        switchPage();
    }
    changeClockBackground();
    setInterval(changeClockBackground, 1000);
});