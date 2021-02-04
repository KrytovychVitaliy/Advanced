function printCoffeeMake(type) { //для call/apply/bind = технічний видрук "значень" кавомашин
  console.log(`My ${type} ${Object.entries(this)
                                    .flat()
                                    .slice(0, 4)
                                    .join(" ")}. ---------------`
  );
};



// ------------------------------------------------------------------------------------------------------------------------
function CoffeeMake(brand, color) {
  this.brand = brand,
  this.color = color
};
CoffeeMake.prototype = {
  on: () => console.log("apparatus ON."),
  off: () => console.log("apparatus OFF.")
};

myCoffeeMake = new CoffeeMake("Tefal", "red");
myCoffeeMake.on();
myCoffeeMake.off();
printCoffeeMake.call(myCoffeeMake, "CoffeeMaker");


// ------------------------------------------------------------------------------------------------------------------------
function DripCoffeeMake(brand, color) {
    this.brand = brand,
    this.color = color,
    this.preparation_americano = () => console.log('Preparation of the drink "Americano".')
};
DripCoffeeMake.prototype = CoffeeMake.prototype; //наслідує від CoffeeMake

myDripCoffeeMaker = new DripCoffeeMake("Philips", "black");
myDripCoffeeMaker.on();
myDripCoffeeMaker.off();
myDripCoffeeMaker.preparation_americano();
printCoffeeMake.bind(myDripCoffeeMaker, "DripCoffeeMaker")();


// ------------------------------------------------------------------------------------------------------------------------
function CarobCoffeeMake(brand, color) {
    this.brand = brand,
    this.color = color,
    this.two_cups = () => console.log("Simultaneous preparation of two cups of coffee.")
}
CarobCoffeeMake.prototype = new DripCoffeeMake(); //наслідує від DripCoffeeMake (і, відповідно, від CoffeeMake)

myCarobCoffeeMaker = new CarobCoffeeMake("Sumsung", "green");
myCarobCoffeeMaker.on();
myCarobCoffeeMaker.off();
myCarobCoffeeMaker.preparation_americano();
myCarobCoffeeMaker.two_cups();
printCoffeeMake.apply(myCarobCoffeeMaker, ["CarobCoffeeMake"]);


// ------------------------------------------------------------------------------------------------------------------------
function CoffeeMachine(brand, color, pump_pressure) {
    this.brand = brand,
    this.color = color,
    this.pump_pressure = pump_pressure,
    this.coffee_strength = () => console.log("Coffee strength adjustment."),
    this.printCoffeeMachine = function () {
      console.log(`My ${this.brand} ${this.color} coffee machine has a pressure of ${this.pump_pressure} and the following functions:`);
      for (const element in this) {
        console.log(`${element}  ||  ${this[element]}`)
      }
    };
}
CoffeeMachine.prototype = new CarobCoffeeMake(); //наслідує від CarobCoffeeMake, DripCoffeeMake і від CoffeeMake
myCoffeeMachine = new CoffeeMachine("Delonghi", "blue", "15 bar");
myCoffeeMachine.on();
myCoffeeMachine.off();
myCoffeeMachine.preparation_americano();
myCoffeeMachine.two_cups();
myCoffeeMachine.coffee_strength();
myCoffeeMachine.printCoffeeMachine();