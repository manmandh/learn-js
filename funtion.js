var globalVariable = 'I am a global variable';

function globalFunction() {
  console.log(globalVariable); //in ra "I am a global variable"
}

console.log(globalVariable); //inra "I am a global variable"
globalFunction();

function localFunction() {
  if (true) {
    let localVariable = 'I am a local variable';
    console.log(localVariable); //in ra "I am a local variable"
  }

  console.log(localVariable); // error: localVariable is not defined
}
localFunction();

//function assigned to a variable
const sayHello = function () {
  console.log('Hello!');
};

//function passed as an argument
function greet(greetingFunction) {
  greetingFunction();
}
greet(sayHello); //inra "Hello!"

//function returned from another function
function createGreeter() {
  return function () {
    console.log('Greetings!');
  };
}
const greeter = createGreeter();
greeter(); //in ra "Greetings!"

//function declaration
function greet(name) {
  console.log(`Hello, ${name}!`);
}
greet('Hieu'); //in ra "Hello, Hieu!"

//arrow function
const greet = (name) => {
  console.log(`Hello, ${name}!`);
};
greet('Man'); //in ra "Hello, Man!"

function greet(name) {
  console.log(`Hello, ${name}!`);
}
function welcome() {
  console.log('Welcome!');

  greet('Marry');
}
function main() {
  console.log('Start');
  welcome();
  console.log('End');
}
main();

//closure
function outerFunction() {
  var outerVariable = "I'm a function outside";
  function innerFunction() {
    console.log(outerVariable);
  }
  return innerFunction;
}
var closure = outerFunction();
closure(); // in ra "I'm a function outside"
