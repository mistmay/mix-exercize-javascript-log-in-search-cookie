export const hexCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', "A", "B", "C", "D", "E", "F"];

export const userArray = [{
        id: 1,
        name: "Catzilla",
    },
    {
        id: 2,
        name: "Fufu",
    },
    {
        id: 3,
        name: "Jiggles",
    },
    {
        id: 4,
        name: "Kitkat",
    },
    {
        id: 5,
        name: "Cat",
    },
    {
        id: 6,
        name: "Zazzles",
    },
];

export const noResult = [{
    name: 'No Users'
}];

export class User {
    _username;
    _password;
    constructor(username, password) {
        this._username = username;
        this._password = password;
    }
    get username() {
        return this._username;
    }
    get password() {
        return this._password;
    }
}