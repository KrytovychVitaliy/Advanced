function getSqrt(num) {
    if (arguments.length > 1)
        return 'Функція приймає тільки 1 аргумент!';
    if (arguments.length === 0)
        return 'Будь ласка, введіть число!';
    if (typeof num !== "number")
        return 'Повинно бути числове значення.';
    if (typeof num === "number" && !Number.isNaN(num) && num !== Infinity && num !== -Infinity) {
        if (num >= 0) {
            return `Квадратний корінь з ${num} дорівнює ${Math.sqrt(num)}.`;
        }
        else {
            return 'Введіть додатнє число.';
        }
        ;
    }
    ;
}
;
console.log(getSqrt());
console.log(getSqrt(16));
console.log(getSqrt(-16));
console.log(getSqrt(23, 54));
console.log(getSqrt('не число'));
