document.getElementById("form_signIn").style.display = 'none'; //зникає сторінка2
document.getElementById("div_acc").style.display = 'none'; //зникає сторінка3
let userCheck = 0; //лічильник правильно заповнених полів даних юзера


const inputArr = Array.from(document.getElementsByClassName('div_input')); //всі 6 div_input документa
inputArr.forEach(element => { //подія click на кожен div форми
    element.addEventListener('click',
                            (event) => {
                                event.currentTarget.childNodes[1].classList.add('pClickInput'); //зменшення тексту підписів input
                                event.currentTarget.childNodes[3].focus(); //фокус на поточному input, сусідньому р
                            });
});


document.getElementById('signIn').addEventListener('click', function () { //клік по тексту "Sign In now" --------------------
    document.getElementById("form_input").style.display = 'none'; //зникає сторінка1
    document.getElementById("form_signIn").style.removeProperty('display'); //зявляється сторінка2
});


document.getElementById('signUp').addEventListener('click', function () { //клік по тексту "Sign Up now" -------------------
    document.getElementById("form_signIn").style.display = 'none'; //зникає сторінка2
    document.getElementById("form_input").style.removeProperty('display'); //зявляється сторінка1
});


document.getElementById('signIn_submit').addEventListener('click', (event)=>{ //клік по кнопці "Sing In" -------------------------
    event.preventDefault();
    console.log(document.getElementById('signIn_email').value);
    console.log(localStorage.getItem(document.getElementById('signIn_email').value));
    if (localStorage.getItem(document.getElementById('signIn_email').value)) { //якщо введений емейл зареєстровано
        check(true, 'signIn_email');
        const currentUser = JSON.parse(localStorage.getItem(document.getElementById('signIn_email').value));
        if (document.getElementById('signIn_password').value && currentUser.password === document.getElementById('signIn_password').value) { //якщо пароль введено і він правильний
            check(true, 'signIn_password');
            openAccount(currentUser);
        } else { //якщо пароль помилковий або його не введено;
            check(false, 'signIn_password');
        };
    } else { //якщо введений емейл незареєстровано/відсутній
        check(false, 'signIn_email');
    };
});

function openAccount(data) { //заповнення даних користувача ---------------------------------------------------------------------
    document.getElementById("form_signIn").style.display = 'none'; //зникає сторінка2
    document.getElementById("div_acc").style.removeProperty('display'); //зявляється стор3
    document.querySelector('.div-acc__data-firstName').textContent = data.firstName + ' ';
    document.querySelector('.div-acc__data-secondName').textContent = data.secondName;
    document.querySelector('.div-acc__data-emailAddress').textContent = data.emailAddress;
    document.querySelector('.div-acc__data-position').textContent = data.job;
};

document.getElementById('input_submit').addEventListener('click', (event)=>{ //клік по кнопці "Sing Up" -------------------------
    event.preventDefault();
    userCheck = 0; //обнулення лічильника кількості правильно заповнених полів
    checkSignUp();
    if (localStorage.getItem(document.getElementById('input_email').value)) { //якщо в localStorage є ключ, що відповідає емейлу
        check(false, 'input_email'); //емейл - в цьому випадку точно помилково заповнений
        document.getElementById('span_email').textContent = 'This email already exist'; //повідомлення про вже наявність такого емейлу
    } else if (userCheck === 4){ //якщо в localStorage нема ключа, що відповідає емейлу, і правильно заповнено всі 4 поля input
        let user = {
            firstName: document.getElementById('input_first_name').value,
            secondName: document.getElementById('input_last_name').value,
            emailAddress: document.getElementById('input_email').value,
            password: document.getElementById('input_password').value,
            job: 'Designer & Web Developing'
        }
        localStorage.setItem(user.emailAddress, JSON.stringify(user));
        location.reload();
    } else {
        userCheck = 0;
    };
});


//блок перевірки заповнення полів сторінки "Sign Up" ----------------------------------------------------------------------------
function checkSignUp() {
    //в імені і прізвищі = перша буква маленька або велика, решта - маленькі (якщо вони є - якщо імя не з 1 букви)
    let first_name = /^[A-Za-z][a-z]{0,19}$/.test(document.getElementById('input_first_name').value);
    check(first_name, 'input_first_name');

    let last_name = /^[A-Za-z][a-z]{0,19}$/.test(document.getElementById('input_last_name').value);
    check(last_name, 'input_last_name');

    //в емейлі = до @ можна було просто [\w\.-]+ але тоді не врахується, що крапка і тире не можуть стояти спочатку або зразу перед @
    //після @ букви пишуть маленькі, крапка не може бути останнім символом, чи йти зразу після @
    let email = /^(([\w]+)|([\w]+[\w\.-]*[\w]+))@([a-z]+[.][a-z]+)$/.test(document.getElementById('input_email').value);
    check(email, 'input_email');

    let password = /^\w{3,15}$/.test(document.getElementById('input_password').value);
    check(password, 'input_password');
};


function check(check_in, name) { //забарвлення полів по результатах їх перевірки
    if (!check_in) { //якщо ввведено помилкове значення
        if (document.getElementById(`${name}`).classList.contains('valid')) document.getElementById(`${name}`).classList.remove('valid');
        if (!document.getElementById(`${name}`).classList.contains('invalid')) document.getElementById(`${name}`).classList.add('invalid');
        if (document.querySelector(`#${name} ~ .p_hidden`).classList.contains('hidden')) document.querySelector(`#${name} ~ .p_hidden`).classList.remove('hidden');
        if (!document.querySelector(`#${name} ~ .p_V`).classList.contains('hidden')) document.querySelector(`#${name} ~ .p_V`).classList.add('hidden');
        if (document.querySelector(`#${name} ~ .p_X`).classList.contains('hidden')) document.querySelector(`#${name} ~ .p_X`).classList.remove('hidden');
    } else if (check_in) { //якщо введено правильне значення
        userCheck += 1;
        if (document.getElementById(`${name}`).classList.contains('invalid')) document.getElementById(`${name}`).classList.remove('invalid');
        if (!document.getElementById(`${name}`).classList.contains('valid')) document.getElementById(`${name}`).classList.add('valid');
        if (!document.querySelector(`#${name} ~ .p_hidden`).classList.contains('hidden')) document.querySelector(`#${name} ~ .p_hidden`).classList.add('hidden');
        if (!document.querySelector(`#${name} ~ .p_X`).classList.contains('hidden')) document.querySelector(`#${name} ~ .p_X`).classList.add('hidden');
        if (document.querySelector(`#${name} ~ .p_V`).classList.contains('hidden')) document.querySelector(`#${name} ~ .p_V`).classList.remove('hidden');
    };
};


document.querySelector('.div-acc__footer').addEventListener('click', function () { //клік по кнопці "Sign Up" стор3 ---------
    location.reload(); //повернення на початкову сторінку
});