function max (a: number, b: number, ...c: Array<number>): number {
    return Array.from(arguments).sort((a,b) => b-a)[0]
};

console.log(max(6, 25, 1, 1000, 30, -6, 3000));