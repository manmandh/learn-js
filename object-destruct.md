#Object Destruct
######Object destruct là gì?
Giả sử ta có ví dụ :

```js
var hero = {
  name: 'Batman',
  realName: 'Bruce Wayne',
};

var name = hero.name;
var realName = hero.realName;

console.log(name); // => 'Batman',
console.log(realName); // => 'Bruce Wayne'
```

Ta cần gắn từng thuộc tính của 1 object vào các biến cùng tên, ta luôn phải gắn lần lượt như này

Ví dụ khác nữa :

```js
function foo() {
  return [1, 2, 3];
}

var tmp = foo();
(a = tmp[0]), (b = tmp[1]), (c = tmp[2]);

console.log(a, b, c); // 1 2 3
```

Rất là mất thời gian =))
Vì vậy trong phiên bản ES6 đã ra mắt tính năng cho phép gán giá trị cho biến bằng các thuộc tính của 1 object

Syntax :

```js
let {a,b,c} = object

Làm lại ví dụ 1 :
var {name:name, realName:realName} = hero
//gán giá trị name của object vào biến name, realName vào realName

var {name:ten, realName:tenThat} = hero
//gán name vào ten, gán realName vào tenThat
```

Tương tự đối với mảng :

```js
let arr = [1, 2, 3];
let [a, b, c] = arr;
```

#####1 cái nữa:
Không nhất thiết phải dùng let/var/const để gán giá trị ngay lúc khởi tạo, mà còn có thể dùng ( ) để gán

Ví dụ :

```js
let a, b, c;
[a, b, c] = [1, 2, 3];

hay;

let obj = { x: 1, y: 2, z: 3 }(({ x: a, y: b, z: c } = obj));
```

Biến được gán còn có thể là object

```js
var o = {};

[o.a, o.b, o.c] = foo();
({ x: o.x, y: o.y, z: o.z } = bar());

console.log(o.a, o.b, o.c); // 1 2 3
console.log(o.x, o.y, o.z); // 4 5 6
```

Sử dụng computed object

```js
const bar = () => {
  return { x: 1, y: 2, z: 3 };
};
var which = 'x';
o = {};

({ [which]: o[which] } = bar());

console.log(o.x); // 4
```

Ta có thể sử dụng để làm object mapping/transformation:

```js
var o1 = { a: 1, b: 2, c: 3 },
  o2 = {};

({ a: o2.x, b: o2.y, c: o2.z } = o1);

console.log(o2.x, o2.y, o2.z); // 1 2 3
```

Hoặc có thể map object vào array:

```js
var o1 = { a: 1, b: 2, c: 3 },
  a2 = [];

({ a: a2[0], b: a2[1], c: a2[2] } = o1);

console.log(a2); // [1, 2, 3]
```

Hoặc ngược lại

```js
var a1 = [1, 2, 3],
  o2 = {};

[o2.a, o2.b, o2.c] = a1;

console.log(o2.a, o2.b, o2.c); // 1 2 3
```

Hoặc ta có thể reorder 1 array sang 1 array khác:

```js
var a1 = [1, 2, 3],
  a2 = [];

[a2[2], a2[0], a2[1]] = a1;

console.log(a2); // [2, 3, 1]
```

Thậm chí là giải quyết bài toán swap mà khỏi cần biến tmp:

```js
var x = 10,
  y = 20;
[y, x] = [x, y];

console.log(x, y); // 20 10
```

###Destructuring Assigment Expressions
Một phép gán với object destructuring hay array destructuring sẽ có kết quả trả về là biểu thức bên tay phải.

```js
var o = { a: 1, b: 2, c: 3 },
  a,
  b,
  c,
  p;

p = { a, b, c } = o;

console.log(a, b, c); // 1 2 3
p === o; // true
```

Trong đoạn code trên, kết quả trả về của { a, b, c } = o; là o, và p khi đó được gán lại cho o. Tương tự với array:

```js
var o = [1, 2, 3],
  a,
  b,
  c,
  p;

p = [a, b, c] = o;

console.log(a, b, c); // 1 2 3
p === o; // true
```

Với tính chất như vậy, ta có thể tạo ra một chuỗi destructuring assignment expression:

```js
var o = { a: 1, b: 2, c: 3 },
  p = [4, 5, 6],
  a,
  b,
  c,
  x,
  y,
  z;

({ a } = { b, c } = o);
[x, y] = [z] = p;

console.log(a, b, c); // 1 2 3
console.log(x, y, z); // 4 5 6
```
