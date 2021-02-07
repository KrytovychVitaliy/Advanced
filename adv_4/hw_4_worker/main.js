class Firm{
    firm = 'IBM';
    constructor(unit){
        this.unit = unit;
    };
    printData = function(){
        return (Object.entries(this)
                        .filter((data_1) => {
                            // return typeof data_1[1] == 'function' ? false : true
                            return typeof data_1[1] !== 'function'
                        })
                        .join(`;\n`)
                        .replaceAll(',', ': ')
                        .concat(';\n----------')
        );
    };
};

class FirmUnit extends Firm{
    constructor(unit, position){
        super(unit);
        this.position = position;
    };
};

class Worker extends FirmUnit{
    premium = 0;
    constructor(unit, position, firstName, secondName, rate, days){
        super(unit, position);
        this.firstName = firstName;
        this.secondName = secondName;
        this.rate = rate;
        this.days = days;
    };
    getSalary(){
        return (this.rate * this.days + this.premium);
    };
    get salary(){
        return (this.rate * this.days + this.premium);
    };
    set addPremium(pr = 0){
        this.premium = pr;
    };
};

//----------------------------------------------------------------------------------------------------
const workerIvan = new Worker('office', 'web developer', 'Ivan', 'Ivanov', 30, 22);
console.log(workerIvan.firm);
console.log(workerIvan.unit);
console.log(workerIvan.position);
console.log(workerIvan.firstName);
console.log(workerIvan.secondName);
console.log(workerIvan.rate);
console.log(workerIvan.days);
console.log(workerIvan.getSalary());
console.log(workerIvan.salary);
workerIvan.addPremium = 2500;
console.log(workerIvan.salary);

//----------------------------------------------------------------------------------------------------
const workerPetro = new Worker('office', 'web developer', 'Petro', 'Petriv', 40, 20);
console.log(workerPetro.firm);
console.log(workerPetro.unit);
console.log(workerPetro.position);
console.log(workerPetro.firstName);
console.log(workerPetro.secondName);
console.log(workerPetro.rate);
console.log(workerPetro.days);
console.log(workerPetro.getSalary());
console.log(workerPetro.salary);
workerPetro.addPremium = 2000;
console.log(workerPetro.salary);

//----------------------------------------------------------------------------------------------------
console.log(workerIvan.printData());
console.log(workerPetro.printData());