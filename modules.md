# Modules trong JS

> Tổ chức các module thành cád file riêng rẽ độc lập để dễ dành tái sử dụng và quản lý, có 2 cách để thao tác với modules

#### CommonJS Modules Syntax

Giả sử tệp function.js có

```js
function sum(a, b) {
  return a + b;
}

function divide(a, b) {
  return a / b;
}

module.exports = {
  sum: sum,
  divide: divide,
};
```

file main.js

```js
const calc = require('function.js');
console.log(calc.sum(1, 2)); //3
```

module.exports là 1 biến khi require sẽ trả về giá trị mà modules.exports có

Modules có kiểu any

Ở vs dụ đầu, do module.exports chứa object nên giá trị của calc khi require là một object chứa các function

Ví dụ 2:

```js
//function.js
function sum(a, b) {
  return a + b;
}

module.exports = sum;

//main.js
const calc = require('function.js');
console.log(calc(1, 2)); //3
```

Ví dụ này, calc có gía trị là một function, vì vậy có thể sử dụng luôn

> require có thể được gọi bất kì đâu trong chương trình

Ví dụ :

```js
if(user.length > 0){
   const userDetails = require(‘./userDetails.js’);
  // Do something ..
}
```

`require` có thể gọi kể cả trong if, for, while,...

###ESModules
Để sử dụng, cần cài đặt `package.json` thêm phần

```js
"type":"module"
```

để sử dụng ESModule mặc định thay cho Common Module
hoặc sử dụng đuôi file `.mjs` cho các file có sử dụng import, export của ESModule

Ví dụ :

```js
//không sử dụng ES Module làm mặc định

//function.mjs
function sum(a, b) {
  return a + b;
}

function divide(a, b) {
  return a / b;
}

export { sum, divide };

//main.mjs
import { sum } from 'function.mjs';
console.log(sum(1, 2));
```

> `import` chỉ có thể gọi ở đầu chương trình

```js
import anh from 'functions.mjs';
hoặc;
import * as anh from 'functions.mjs';
//anh sẽ có giá trị là object
console.log(anh.sum(1, 2));

//dùng với object destruct
import { sum, divide } from 'function.mjs';
//const {sum,divide} = {...}
```

tự định nghĩa tên hàm

```js
import { sum as tinhtong, divide as chia } from 'function.mjs';
```

Định nghĩa default export

```js
export default sum;
export { divide, minus };
```

Khi import không cần destruct lại nữa

```js
import sum from .....
```
