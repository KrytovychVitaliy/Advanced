const getS = selector => HTMLElement = document.querySelector(selector); //функція вибору елемента document --------------------------------------------
const arrUser = [getS('.table tr').innerHTML]; //масив для зберігання даних юзерів (нульовий елемент = заголовки колонок/перший рядок)
let userIndex = null; //для редагування даних юзера
class User {
    constructor(_login, _password, _email) {
        this._login = _login;
        this._password = _password;
        this._email = _email;
    }
    ;
    get login() {
        return this._login;
    }
    ;
    set login(login) {
        this._login = login;
    }
    ;
    get password() {
        return this._password;
    }
    ;
    set password(password) {
        this._password = password;
    }
    ;
    get email() {
        return this._email;
    }
    ;
    set email(email) {
        this._email = email;
    }
    ;
}
;
function addUser() {
    if (getS(`.login`).value
        && getS(`.password`).value
        && getS(`.email`).value) { //виконується, якщо всі поля заповнено
        let objUser = new User(getS(`.login`).value, getS(`.password`).value, getS(`.email`).value); //створюється новий user     
        if (typeof userIndex === 'number') { //якщо редагуємо юзера
            arrUser[userIndex] = objUser;
            userIndex = null;
            getS(`.addUser`).textContent = 'Add user';
        }
        else { //якщо вводимо нового юзера
            arrUser.push(objUser);
        }
        ;
        getS('form').reset(); //очистка форми
        render();
    }
    ;
}
;
function render() {
    getS(`.table`).innerHTML = arrUser[0]; //заголовки табличок/рядок 1
    for (let i = 1; i < arrUser.length; i++) { //вставляються рядки таблиці
        let enterRow = `
            <tr>
            <td>${i}</td>
            <td> ${arrUser[i].login} </td>
            <td>${arrUser[i].password}</td>
            <td>${arrUser[i].email}</td>
            <td><button class="editUser" data-ed="${i}" onclick="editUser(event)">Edit</button></td>
            <td><button class="deleteUser" data-del="${i}" onclick="deleteUser(event)">Delete</button></td>
            </tr>`;
        getS(`.table`).innerHTML += enterRow;
    }
    ;
}
;
function editUser(event) {
    const target = event.target;
    getS(`.addUser`).textContent = 'Edit user'; //зміна підпису кнопки
    userIndex = parseInt(target.dataset.ed); //визначення індекса юзера, по якому клікнуто    
    getS(`.login`).value = arrUser[userIndex].login;
    getS(`.password`).value = arrUser[userIndex].password;
    getS(`.email`).value = arrUser[userIndex].email;
}
;
function deleteUser(event) {
    const target = event.target;
    arrUser.splice(parseInt(target.dataset.del), 1); //видалення відповідного запису про користувачча в масиві
    render(); //перемальовування таблички
    getS('form').reset(); //очистка форми - якщо нажато Delete в режимі редагування
}
;
