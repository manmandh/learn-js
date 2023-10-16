//Creating a Regular Expression
let re1 = new RegExp("abc");
let re2 = /abc/;

console.log(/abc/.test("abcde"));
// true
console.log(/abc/.test("abxde"));
// false

//Sets of Characters
console.log(/[0123456789]/.test("in 1992"));
// true
console.log(/[0-9]/.test("in 1992"));
// true

//Repeating Parts of a Pattern
console.log(/'\d+'/.test("'123'"));
// → true
console.log(/'\d+'/.test("''"));
// → false
console.log(/'\d*'/.test("'123'"));
// → true
console.log(/'\d*'/.test("''"));
// → true

//group subexpression
let cartoonCrying = /boo+(hoo+)+/i;
console.log(cartoonCrying.test("Boohoooohoohooo"));
// → true

//Matches and Groups
let match = /\d+/.exec("one two 100");
console.log(match);
// → ["100"]
console.log(match.index);
// → 8

//word and string boundaries
console.log(/cat/.test("concatenate"));
// → true
console.log(/\bcat\b/.test("concatenate"));
// → false

//Choice Patterns
let animalCount = /\b\d+ (pig|cow|chicken)s?\b/;
console.log(animalCount.test("15 pigs"));
// → true
console.log(animalCount.test("15 pigchickens"));
// → false

//the replace method
console.log("Borobudur".replace(/[ou]/, "a"));
// → Barobudur
console.log("Borobudur".replace(/[ou]/g, "a"));
// → Barabadar

//greed
function stripComments(code) {
    return code.replace(/\/\/.*|\/\*[^]*\*\//g, "");
}
console.log(stripComments("1 + /* 2 */3"));
// → 1 + 3
console.log(stripComments("x = 10;// ten!"));
// → x = 10;
console.log(stripComments("1 /* a */+/* b */ 1"));
// → 1 1  

let name = "harry";
let text = "Harry is a suspicious character.";
let regexp = new RegExp("\\b(" + name + ")\\b", "gi");
console.log(text.replace(regexp, "_$1_"));
// → _Harry_ is a suspicious character.

//parse in ini file
function parseINI(string) {
    // Start with an object to hold the top-level fields
let result = {};
let section = result;
string.split(/\r?\n/).forEach(line => {
let match;
if (match = line.match(/^(\w+)=(.*)$/)) {
section[match[1]] = match[2];
} else if (match = line.match(/^\[(.*)\]$/)) {
section = result[match[1]] = {};
} else if (!/^\s*(;.*)?$/.test(line)) {
throw new Error("Line '" + line + "' is not valid.");
}
});
    return result;
}
console.log(parseINI(`name=Vasilis[address]city=Tessaloniki`));
// → {name: "Vasilis", address: {city: "Tessaloniki"}}