'use strict'
import {goods} from './goods.js';
import {strUpper, totalSum, calculation, elemCount} from './processing.js';

//-----------------------------------------------------------------------------------------------------------
function printLeftBlock(){ //роздрук лівого блоку зі всіма товарами
    for (const key in goods) {
        document.getElementById('div_data').insertAdjacentHTML('beforeend',
            `<p>${strUpper(key)}</p>
            <div><span id="${key}"></span><span>${goods[key].count} шт. по ${goods[key].price}$</span></div>`
        );
    };
};
printLeftBlock();

//-----------------------------------------------------------------------------------------------------------
function printSecondaryBlock(){ //роздрук radio - середня колонка
for (const key in goods) {
    document.getElementById('radio_change').insertAdjacentHTML('beforeend',
        `<p><input type="radio" name="number" id="radio_${key}" value="${key}">
        <label for="radio_${key}">${strUpper(key)}</label></p>`
    );

};
document.querySelector('input[type="radio"]').checked = 'checked'; //checked - першому radio
};
printSecondaryBlock();

//-----------------------------------------------------------------------------------------------------------
const printBalans = () =>  //роздрук Балансу
    document.getElementById('div_data').insertAdjacentHTML('afterbegin',
            `<p>Баланс</p>
            <div><span id="span_balans"></span><span> ${totalSum()}$</span></div>`
        );
printBalans();

//-----------------------------------------------------------------------------------------------------------
let addGoods = {}; //обєкт зберігання доданого/вибраного асортименту товарів
document.getElementById('add').addEventListener('click', function () { //клік по кнопці "Додати"
    document.getElementById('output_data').innerHTML = ''; //очистка дисплею куплених товарів
    if (document.getElementById('input_num').value > 0) { //якщо введено число > 0
        let elemCheck = document.querySelector('input:checked').value; //поточне radio checked
        const val = Math.round(document.getElementById('input_num').value); //введена кількість товару
        if (elemCount(elemCheck) >= val) { //якщо введена кількість товару є на залишку
            addGoods[elemCheck] = { name: document.querySelector('input:checked + label').textContent, count: val }; //формування масиву доданих товарів
            document.getElementById('add_goods').innerHTML = ''; //очистка дисплею "Додати"
            document.getElementById('input_num').value  = ''; //очистка дисплею "Кількість"
            for (const key in addGoods) { //видрук доданих товарів
                document.getElementById('add_goods').insertAdjacentHTML("beforeend", `<p>${addGoods[key].name}: ${addGoods[key].count} шт. (${addGoods[key].count * goods[key].price}$)</p>`);
            };
        } else {alert(`Вибачте, але на складі залишилося товару '${document.querySelector('input:checked + label').textContent}' тільки ${elemCount(elemCheck)} штук.`)};
    } else { alert('Потрібно ввести кількість вибраного товару - це має бути ціле число більше нуля.'); };
});

//-----------------------------------------------------------------------------------------------------------
document.getElementById('buy').addEventListener('click', function () { //клік по кнопці "Купити"
    if (document.getElementById('add_goods').innerHTML) { //якщо товари додано
        document.getElementById('add_goods').innerHTML = ''; //очистка дисплею доданих товарів
        document.getElementById('output_data').innerHTML = ''; //очистка дисплею куплених товарів
        let sum = 0;
        for (const key in addGoods) { //видрук купленого асортименту
            let currentValue = (+addGoods[key].count * goods[key].price);
            sum += currentValue;
            document.getElementById('output_data').insertAdjacentHTML("beforeend", `<p>${addGoods[key].name}: ${addGoods[key].count} шт. (${currentValue})$ </p>`);
        };
        document.getElementById('output_data').insertAdjacentHTML("beforeend", `<p>Всього: ${sum}$</p>`); //видрук загальної вартості
        calculation(addGoods); //мінусування проданих товарів
        document.getElementById('span_balans').innerHTML = totalSum(); //роздрук Балансу
        printLeftBlock(); //роздрук поточного стану лівого блоку зі всіма товарами
        document.getElementById('div_data').innerHTML = ''; //очистка лівої колонки
        printBalans(); //роздрук Балансу
        printLeftBlock(); //роздрук лівого блоку зі всіма товарами
        addGoods = {}; //очистка обєктa зберігання вибраного/купленого асортименту
    } else { alert('У Вас немає доданих в корзину товарів - спочатку виберіть товари для купівлі.') };
});