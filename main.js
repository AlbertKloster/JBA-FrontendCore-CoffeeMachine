const input = require('sync-input');
const coffeeMachine = {
  water: 400,
  milk: 540,
  sugar: 20,
  coffeeBeans: 120,
  smCups: 10,
  mdCups: 10,
  lgCups: 10,
  money: 550,
};
const getState = () => {
  return `The coffee machine has:
${coffeeMachine.water} ml of water
${coffeeMachine.milk} ml of milk
${coffeeMachine.coffeeBeans} g of coffee beans
${coffeeMachine.cups} disposable cups
$${coffeeMachine.money} of money`
};
const espresso = {
  water: 250,
  milk: 0,
  coffeeBeans: 16,
  price: 4,
};
const latte = {
  water: 350,
  milk: 75,
  coffeeBeans: 20,
  price: 7,
};
const cappuccino = {
  water: 200,
  milk: 100,
  coffeeBeans: 12,
  price: 6,
};

const takeCoffee = (coffee) => {
  let missionResource = getMissingResource(coffee);
  if (missionResource != null) {
    console.log(`Sorry, not enough ${missionResource}!`);
    return;
  }
  console.log("I have enough resources, making you a coffee!")
  coffeeMachine.water -= coffee.water;
  coffeeMachine.milk -= coffee.milk;
  coffeeMachine.coffeeBeans -= coffee.coffeeBeans;
  coffeeMachine.money += coffee.price;
};

const getCoffeeForCommand = (command, size, sugar) => {
  if (command === "1") return {...espresso, size, sugar};
  if (command === "2") return {...latte, size, sugar};
  if (command === "3") return {...cappuccino, size, sugar};
};

const getMissingResource = (coffee) => {
  if (coffeeMachine.water < coffee.water) return "water";
  if (coffeeMachine.milk < coffee.milk) return "milk";
  if (coffeeMachine.coffeeBeans < coffee.coffeeBeans) return "coffee beans";
  if (coffee.sugar === "1" && coffeeMachine.sugar < 1) return "sugar";
  const cups = coffee.size === "1" ? coffeeMachine.smCups :
    coffee.size === "2" ? coffeeMachine.mdCups : coffeeMachine.lgCups;
  if (cups < 1) return "cups";
  return null;
};

let exit = false;
while (!exit) {
  console.log("Write action (buy, fill, take, remaining, exit): ");
  const action = input();
  if (action === "buy") {
    console.log("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu: ")
    const coffee = input();
    console.log("What cup size do you wish? 1 - small, 2 - medium, 3 - large: ")
    const size = input();
    console.log("1 - with sugar, 2 - no sugar: ")
    const sugar = input();
    if (coffee !== "back") takeCoffee(getCoffeeForCommand(coffee), size, sugar);
  }
  if (action === "fill") {
    console.log("Write how many ml of water you want to add: ");
    coffeeMachine.water += +input();
    console.log("Write how many ml of milk you want to add: ");
    coffeeMachine.milk += +input();
    console.log("Write how many grams of coffee beans you want to add: ");
    coffeeMachine.coffeeBeans += +input();
    console.log("Write how many sugar units you want to add: ");
    coffeeMachine.sugar += +input();
    console.log("Write how many small size cups you want to add: ");
    coffeeMachine.smCups += +input();
    console.log("Write how many middle size cups you want to add: ");
    coffeeMachine.mdCups += +input();
    console.log("Write how many large size cups you want to add: ");
    coffeeMachine.lgCups += +input();
  }
  if (action === "take") {
    console.log(`I gave you $${coffeeMachine.money}`);
    coffeeMachine.money = 0;
  }
  if (action === "remaining") {
    console.log(getState());
  }
  if (action === "exit") {
    exit = true;
  }
}
