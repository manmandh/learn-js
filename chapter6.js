let rabbit = {};
rabbit.speak = function (line) {
  console.log(`The rabbit says '${line}'`);
};
rabbit.speak("I'm alive.");
// The rabbit says 'I'm alive.'

function speak(line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
}
let whiteRabbit = { type: 'white', speak };
let hungryRabbit = { type: 'hungry', speak };
whiteRabbit.speak('Oh my ears and whiskers, ' + "how late it's getting!");

// The white rabbit says 'Oh my ears and whiskers, how
// late it's getting!'

hungryRabbit.speak('I could use a carrot right now.');
// The hungry rabbit says 'I could use a carrot right now.'

speak.call(hungryRabbit, 'Burp!');
//The hungry rabbit says 'Burp!'

function normalize() {
  console.log(this.coords.map((n) => n / this.length));
}
normalize.call({ coords: [0, 2, 3], length: 5 });
// [0, 0.4, 0.6]

let empty = {};
console.log(empty.toString);
// function toString(){...}
console.log(empty.toString());
// [object Object]

console.log(Object.getPrototypeOf({}) == Object.prototype);

// → true
console.log(Object.getPrototypeOf(Object.prototype));
// → null

let protoRabbit = {
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  },
};
let killerRabbit = Object.create(protoRabbit);
killerRabbit.type = 'killer';
killerRabbit.speak('SKREEEE!');
// The killer rabbit says 'SKREEEE!'

//Classes
function Rabbit(type) {
  this.type = type;
}
Rabbit.prototype.speak = function (line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
};
let weirdRabbit = new Rabbit('weird');

//class notation
class Rabbit {
  constructor(type) {
    this.type = type;
  }
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
}
let killerRabbit = new Rabbit('killer');
let blackRabbit = new Rabbit('black');

//Overriding Derived Properties
Rabbit.prototype.teeth = 'small';
console.log(killerRabbit.teeth);
// → small
killerRabbit.teeth = 'long, sharp, and bloody';
console.log(killerRabbit.teeth);
// → long, sharp, and bloody
console.log(blackRabbit.teeth);
// → small
console.log(Rabbit.prototype.teeth);
// → small

//maps
let ages = {
  Boris: 39,
  Liang: 22,
  Julia: 62,
};
console.log(`Julia is ${ages['Julia']}`);
// Julia is 62
console.log("Is Jack's age known?", 'Jack' in ages);
// Is Jack's age known? false
console.log("Is toString's age known?", 'toString' in ages);
// Is toString's age known? true

console.log({ x: 1 }.hasOwnProperty('x'));
// true
console.log({ x: 1 }.hasOwnProperty('toString'));
// false

Rabbit.prototype.toString = function () {
  return `a ${this.type} rabbit`;
};
console.log(String(blackRabbit));
//  a black rabbit

let sym = Symbol('name');
console.log(sym == Symbol('name'));
// false
Rabbit.prototype[sym] = 55;
console.log(blackRabbit[sym]);
// 55

//The Iterator Interface
//1.
let okIterator = 'OK'[Symbol.iterator]();
console.log(okIterator.next());
// {value: "O", done: false}
console.log(okIterator.next());
// {value: "K", done: false}
console.log(okIterator.next());
// {value: undefined, done: true}
//2.about loop
let matrix = new Matrix(2, 2, (x, y) => `value ${x},${y}`);
for (let { x, y, value } of matrix) {
  console.log(x, y, value);
}
// 0 0 value 0,0
// 1 0 value 1,0
// 0 1 value 0,1
// 1 1 value 1,1

//getter setter and static
let varyingSize = {
  get size() {
    return Math.floor(Math.random() * 100);
  },
};
console.log(varyingSize.size);
// → 73
console.log(varyingSize.size);
// → 49

class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }
  get fahrenheit() {
    return this.celsius * 1.8 + 32;
  }
  set fahrenheit(value) {
    this.celsius = (value - 32) / 1.8;
  }
  static fromFahrenheit(value) {
    return new Temperature((value - 32) / 1.8);
  }
}
let temp = new Temperature(22);
console.log(temp.fahrenheit);
// → 71.6
temp.fahrenheit = 86;
console.log(temp.celsius);

//inheritance
class SymmetricMatrix extends Matrix {
  constructor(size, element = (x, y) => undefined) {
    super(size, size, (x, y) => {
      if (x < y) return element(y, x);
      else return element(x, y);
    });
  }
  set(x, y, value) {
    super.set(x, y, value);
    if (x != y) {
      super.set(y, x, value);
    }
  }
}

let matrix2 = new SymmetricMatrix(5, (x, y) => `${x},${y}`);
console.log(matrix.get(2, 3));
// 3,2

//Instance of
console.log(new SymmetricMatrix(2) instanceof SymmetricMatrix);
// true
console.log(new SymmetricMatrix(2) instanceof Matrix);
// true
console.log(new Matrix(2, 2) instanceof SymmetricMatrix);
// false
console.log([1] instanceof Array);
// true
