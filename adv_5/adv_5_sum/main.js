function count(){
    let a = 0;
    return num => a += num;
};


const sum = count();
console.log(sum(3));
console.log(sum(5));
console.log(sum(228));