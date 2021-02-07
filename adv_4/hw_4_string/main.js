class MyString{
    reverse = str => str.split('')
                        .reverse()
                        .join('');
    reverse_2(str) {
        let newStr = '';
        for (let i = str.length - 1; i >= 0; i--) {
            newStr += str[i];
        };
        return (newStr);
    };
    reverse_3 = str => {
        let newStr = '';
        str.split('')
            .forEach((letter, ind, arr) => {
                newStr += arr[arr.length - 1 - ind];
            });
        return (newStr);
    };
    ucFirst = str => str.replace(str[0], str[0].toUpperCase()); //заміна першої букви на велику
    ucFirst_2 = str => `${str[0].toUpperCase()}${str.slice(1)}`; //до збільшеної першої букви додається вирізаний залишок
    ucWords = str => str.split('')
                        .map((letter, ind, arr) => {
                            if (ind === 0) letter = letter.toUpperCase(); //для кожної першої букви стрічки
                            if (letter === ' ') arr[ind+1] = arr[ind+1].toUpperCase(); //для кожної букви після пробілу
                            return letter;
                        })
                        .join('');
    ucWords_2 (str, ind = 0){
        let lettInd = str.indexOf(' ', ind); //для кожної букви після пробілу - через рекурсію
        if (lettInd !== -1) {
            str = str.replaceAll(` ${str[lettInd + 1]}`, ` ${str[lettInd + 1].toUpperCase()}`); //заміна сполучення пробіл+наступний символ
            return this.ucWords_2(str, (lettInd + 1));
        };
        return this.ucFirst(str); //для самої першої букви стрічки
    };
    ucWords_3 (str){
        for (let i = 0; i < str.length; i++) {
            if (str[i] === ' ') str = str.replaceAll(` ${str[i+1]}`, ` ${str[i+1].toUpperCase()}`);
        };
        return this.ucFirst(str);
    };
};

const str = new MyString();
console.log(str.reverse('logos front-end academy'));
console.log(str.reverse_2('logos front-end academy'));
console.log(str.reverse_3('logos front-end academy'));
console.log(str.ucFirst('logos front-end academy'));
console.log(str.ucFirst_2('logos front-end academy'));
console.log(str.ucWords('logos front-end academy'));
console.log(str.ucWords_2('logos front-end  academy'));
console.log(str.ucWords_3('logos front-end  academy'));
