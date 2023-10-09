//Return value
function addNumbers(a, b) {
  return a + b;
}

let result = addNumbers(3, 4);
console.log(result); // in ra 7

//Control flow
let temperature = 25;
if (temperature > 30) {
  console.log("It's hot outside!"); //not be executed
} else if (temperature > 20) {
  console.log("It's warm outside!"); // be executed
} else {
  console.log("It's cool outside!"); // not be executed
}
