//функція очистки textArea від ' ' та ','
//
function clearString(str: string): Array<string>{
    const a = str.split(' ');
    const newArr = [];
    a.forEach((el, ind) => { //очистка стрічки-масиву від елементів "" i ","
        if (el !== '' && el !== ',') newArr.push(el);
    });
    newArr.forEach((el, ind) => { //очистка стрічки-масиву від "," які 'прилипли' до слів
        newArr[ind] = el.split(',');
    });
    const clearArr: Array<string> = [];
    newArr.forEach((el, ind) => {
        el.forEach(element => {
            if (element !== '' && element !== ',') clearArr.push(element);
        });
    });
    return clearArr;
};


const badArr: Array<string> = ['java', 'tottenham']; //початкові значення bad_words


function printSpan(arg: Array<string> | string): void { //сюди може приходити або масив (при загрузці сторінки), або стрічка
    let span: HTMLElement = document.getElementById('bad_words');
    if (span.textContent === '' && typeof arg === "object") { //при загрузці сторінки
        arg.forEach((elem, ind) => {
            if (ind === 0) { span.textContent += elem; }
            else { span.textContent += `, ${elem}`; };
        });
    }
    else if (span.textContent === '') { span.textContent += arg; } //якщо поле попередньо очистилося Reset
    else { span.textContent += `, ${arg}`; }; //якщо поле не пусте = додрук до вже наявних значень
};
printSpan(badArr); //друк початкових значень при загрузці сторінки


document.getElementById('span_add').addEventListener('click', () => {
    clearStyleTextarea();
    const inpValue: HTMLInputElement = document.querySelector('input');
    if (inpValue.value.length > 0) { //якщо input містить значення
        clearStyleInput();
        printSpan(inpValue.value);
        inpValue.value = '';
        return;
    } else { //якщо input порожній
        if (!inpValue.classList.contains('inputEmpty')) inpValue.classList.add('inputEmpty');
        inpValue.placeholder = 'Please write a word!';
    };
});


document.getElementById('span_reset').addEventListener('click', () => {
    document.getElementById('bad_words').textContent = '';
    document.querySelector('input').value = '';
    document.querySelector('textarea').value = '';
    clearStyleInput();
    clearStyleTextarea();
    badArr.length = 0;
});


document.getElementById('div_print').addEventListener('click', () => { //клік по "Cenzor"
    const textArea: HTMLTextAreaElement = document.querySelector('textarea');
    if (textArea.value === '') {
        if (!textArea.classList.contains('inputEmpty')) textArea.classList.add('inputEmpty');
        textArea.placeholder = 'Please write a text!';
    }
    else {
        clearStyleTextarea();       
        const arrPrint: Array<string> = document.getElementById('bad_words').textContent.split(', '); //масив слів bad_words
        const arrTextarea: Array<string> = clearString(textArea.value); //масив слів textarea
        arrPrint.forEach(elemArrPrint => {
            arrTextarea.forEach((elemArrTextarea, ind, arr) => {
                if (elemArrPrint === elemArrTextarea) {
                    arr[ind] = '*'.repeat(elemArrTextarea.length);
                };
            });
        });
        textArea.value = arrTextarea.join(' ');
    };
});


document.querySelector('textarea').addEventListener('click', () => {
    clearStyleInput();
});


document.querySelector('input').addEventListener('click', () => {
    clearStyleTextarea();
});


function clearStyleInput(): void { //очистка стилів input, які виникли при натисканні на Add при пустому input
    const inpValue: HTMLInputElement = document.querySelector('input');
    if (inpValue.classList.contains('inputEmpty')) inpValue.classList.remove('inputEmpty');
    inpValue.placeholder = 'word here...';
};


function clearStyleTextarea(): void { //очистка стилів textarea, які виникли при натисканні на Cenzor при пустому textarea
    const textArea: HTMLTextAreaElement = document.querySelector('textarea');
    if (textArea.classList.contains('inputEmpty')) textArea.classList.remove('inputEmpty');
        textArea.placeholder = 'text here...';
};