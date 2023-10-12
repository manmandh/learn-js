#### Ép kiểu trong JS

```js
3 + '3' = '33'
'a' + 123 = 'a123'
true + '123' = 'true123'
false + 123 = 123
true + 1 = 2

```

- Ép kiểu tường minh

```js
//ép thành số
console.log(parseInt('12.2')); //12
parseFloat('20.01'); //20.21
let a = Number('1'); // a = 1
let b = Number(undefined); //NaN

//ép thành string
let a = String(123); //'123'
String(true); // 'true'
String(false); // 'false'
String(NaN)(
  //'NaN'

  //hoặc
  123
).toString(); //'123'

//ép thành boolean undefined, null, 0, NaN, ' ' sẽ chuyển thành false.

result = Boolean('');
console.log(result); // false

result = Boolean(0);
console.log(result); // false

result = Boolean(undefined);
console.log(result); // false

result = Boolean(null);
console.log(result); // false

result = Boolean(NaN);
console.log(result); // false

//các giá trị khác ra true
result = Boolean(324);
console.log(result); // true

result = Boolean('hello');
console.log(result); // true

result = Boolean(' ');
console.log(result); // true
```
