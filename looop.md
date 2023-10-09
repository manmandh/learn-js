###Cấu trúc lặp
####1. Lặp qua biến lặp

```js
for (let i = 1; i <= 3; i++) console.log(i);
```

Output:

```
1
2
3
```

####2. While

```js
let i = 3;
while (i--) {
  console.log(i);
}
```

Output :

```
2
1
0
```

####3. Do - while

```js
let i = 5;
do {
  console.log(`${i} < 5`);
  i--;
} while (i >= 1);
```

Output :

```
5
4
3
2
1
```

####4. forEach

- Dùng cho mảng

```js
arrayName.forEach(function (value, index, array) {});
```

Ví dụ :

```js
let arr = ['a', 'b', 'c'];
arr.forEach((value, index) => {
  console.log(`arr[${index}]=${value}`);
});
```

Output :

```js
arr[0] = a;
arr[1] = b;
arr[2] = c;
```

####5. Map

- Dùng cho mảng
  Trả về 1 mảng mới thay vì thay tác trực tiếp trên mảng như forEach

Ví dụ :

```js
var num = [1, 5, 10, 15];
var doubles = num.map(function (x) {
  return x * 2;
});
console.log(doubles); //[2,10,20,30]
```

####6.For ... in
Lặp qua key của từng phần tử trong Object

```js
let obj = { a: 123, b: 234, c: 345 };
for (let key in obj) {
  console.log(key);
}
//output : a b c
```

####7.For ... of
Lặp qua value của từng phần tử trong set,map hoặc các cấu trúc dữ liệu có iterator

```js
let itobj = new Map([
  ['x', 0],
  ['y', 1],
  ['z', 2],
]);

for (let kv of itobj) {
  console.log(kv);
}
// ['x', 0]
// ['y', 1]
// ['z', 2]

for (let [key, value] of itobj) {
  console.log(value);
}

//0
//1
//2
```

Ví dụ 2:

```js
var arr = [
  { name: 'Man Tran', age: 19 },
  { name: 'Tran Man', age: 20 },
];
for (let obj of arr) console.log(obj); //in ra tung object
for (let { name: name, age: age } of arr) console.log(`${name} ${age} tuổi`); //in ra 'tên' 'tuổi' tuổi sử dụng object destruct để gán
```

######Liên quan :
[Object Destruct](./object-destruct.md)
