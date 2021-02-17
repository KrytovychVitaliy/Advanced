function max(a, b, ...c) {
    return Array.from(arguments).sort((a, b) => b - a)[0];
}
;
console.log(max(6, 25, 1, 1000, 30, -6, 3000));
