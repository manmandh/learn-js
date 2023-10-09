let number = 0;
while (number <= 12) {
  console.log(number);
  number = number + 2;
}
// → 0
// → 2

const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];
for (let i = 0; i < names.length; i++) {
  const name = names[i];
  if (name.charAt(0) === 'C') {
    continue;
  }
  console.log('Hello, ' + name + '!');
  if (name === 'David') {
    console.log('Loop interrupted. Found David!');
    break;
  }
}
// Hello, Alice!
// Hello, Bob!
// Hello, Loop interrupted. Found David!

let yourName;
do {
  yourName = prompt('Who are you?');
} while (!yourName);
console.log(yourName);

//Indenting Code
function calculateSum(a, b) {
  let sum = a + b;
  return sum;
}
let result = calculateSum(3, 4);
console.log(result);

//for Loops
for (let i = 0; i < 10; i++) {
  console.log(i);
}

//Breaking Out of a Loop
for (let current = 20; ; current = current + 1) {
  if (current % 7 == 0) {
    console.log(current);
    break;
  }
}
//Updating Bindings Succinctly
let count = 0;
for (let i = 0; i < 5; i++) {
  count += i;
}
console.log(count);

//Dispatching on a Value with switch
let day = 'Monday';
switch (day) {
  case 'Monday':
    console.log('The first day of the week.');
    break;
  case 'Tuesday':
  case 'Wednesday':
  case 'Thursday':
    console.log('A weekday.');
    break;
  case 'Friday':
    console.log('Friday!');
    break;
  case 'Saturday':
  case 'Sunday':
    console.log('The weekend!');
    break;
  default:
    console.log('Invalid day.');
    break;
}
//It's not common
if (x == 'value1') action1();
else if (x == 'value2') action2();
else if (x == 'value3') action3();
else defaultAction();
