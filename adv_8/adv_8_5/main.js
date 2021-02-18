//функція очистки textArea від ' ' та ','
//
function clearString(str) {
    const a = str.split(' ');
    const newArr = [];
    a.forEach((el, ind) => {
        if (el !== '' && el !== ',')
            newArr.push(el);
    });
    newArr.forEach((el, ind) => {
        newArr[ind] = el.split(',');
    });
    const clearArr = [];
    newArr.forEach((el, ind) => {
        el.forEach(element => {
            if (element !== '' && element !== ',')
                clearArr.push(element);
        });
    });
    return clearArr;
}
;
clearString(document.getElementById('bad_words').textContent);
const badArr = ['java', 'tottenham']; //початкові значення bad_words
function printSpan(arg) {
    let span = document.getElementById('bad_words');
    if (span.textContent === '' && typeof arg === "object") { //при загрузці сторінки
        arg.forEach((elem, ind) => {
            if (ind === 0) {
                span.textContent += elem;
            }
            else {
                span.textContent += `, ${elem}`;
            }
            ;
        });
    }
    else if (span.textContent === '') {
        span.textContent += arg;
    } //якщо поле попередньо очистилося Reset
    else {
        span.textContent += `, ${arg}`;
    }
    ; //якщо поле не пусте = додрук до вже наявних значень
}
;
printSpan(badArr); //друк початкових значень при загрузці сторінки
document.getElementById('span_add').addEventListener('click', () => {
    clearStyleTextarea();
    const inpValue = document.querySelector('input');
    if (inpValue.value.length > 0) { //якщо input містить значення
        clearStyleInput();
        printSpan(inpValue.value);
        inpValue.value = '';
        return;
    }
    else { //якщо input порожній
        if (!inpValue.classList.contains('inputEmpty'))
            inpValue.classList.add('inputEmpty');
        inpValue.placeholder = 'Please write a word!';
    }
    ;
});
document.getElementById('span_reset').addEventListener('click', () => {
    document.getElementById('bad_words').textContent = '';
    document.querySelector('input').value = '';
    document.querySelector('textarea').value = '';
    clearStyleInput();
    clearStyleTextarea();
    badArr.length = 0;
});
document.getElementById('div_print').addEventListener('click', () => {
    const textArea = document.querySelector('textarea');
    if (textArea.value === '') {
        if (!textArea.classList.contains('inputEmpty'))
            textArea.classList.add('inputEmpty');
        textArea.placeholder = 'Please write a text!';
    }
    else {
        clearStyleTextarea();
        const arrPrint = document.getElementById('bad_words').textContent.split(', '); //масив слів bad_words
        const arrTextarea = clearString(textArea.value); //масив слів textarea
        arrPrint.forEach(elemArrPrint => {
            arrTextarea.forEach((elemArrTextarea, ind, arr) => {
                if (elemArrPrint === elemArrTextarea) {
                    arr[ind] = '*'.repeat(elemArrTextarea.length);
                }
                ;
            });
        });
        textArea.value = arrTextarea.join(' ');
    }
    ;
});
document.querySelector('textarea').addEventListener('click', () => {
    clearStyleInput();
});
document.querySelector('input').addEventListener('click', () => {
    clearStyleTextarea();
});
function clearStyleInput() {
    const inpValue = document.querySelector('input');
    if (inpValue.classList.contains('inputEmpty'))
        inpValue.classList.remove('inputEmpty');
    inpValue.placeholder = 'word here...';
}
;
function clearStyleTextarea() {
    const textArea = document.querySelector('textarea');
    if (textArea.classList.contains('inputEmpty'))
        textArea.classList.remove('inputEmpty');
    textArea.placeholder = 'text here...';
}
;
