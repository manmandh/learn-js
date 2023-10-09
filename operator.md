####Toán tử trong Javascript

**_I. Toán tử gán_**

| Toán tử | Ví dụ   | Ý nghĩa                                       |
| ------- | ------- | --------------------------------------------- | --- | --- |
| =       | x = y   | gán x = y                                     |     |     |
| +=      | x+=y    | x=x+y                                         |     |     |
| -=      | x-= y   | x=x-y                                         |     |     |
| \*=     | x \*= y | x = x \* y                                    |
| /=      | x /= y  | x = x / y                                     |
| %=      | x %= y  | x = x % y                                     |
| ??=     | x??=4   | gán x=4 nếu x null hoặc undefined, x = x ?? y |

**_II. Toán tử số học_**

| Toán tử | Mô tả                                | Ví dụ                               |
| ------- | ------------------------------------ | ----------------------------------- |
| +       | phép cộng                            | 25 + 5 = 30                         |
| -       | phép trừ                             | 10 - 5 = 5                          |
| \*\*    | luỹ thừa                             | 2\*\*3 = 8                          |
| \*      | phép nhân                            | 2\*3 = 6                            |
| /       | phép chia                            | 20 / 2 = 10                         |
| %       | lấy phần dư của phép chia 56 / 3 = 2 |
| ++      | Tăng thêm 1                          | var a = 10; a ++; //giá trị a là 11 |
| --      | giảm đi 1                            | var a = 10; a --; //giá trị a là 9  |

**_III. So sánh_**
Giống các ngôn ngữ khác, để ý thêm toán tử

```js
x === y; //x == y và x cùng kiểu dữ liệu y
```

Ví dụ :

```js
let x = 5;
let y = 5;
console.log(x === y); //true
```

```js
x !== y; //x != y và x khác kiểu dữ liệu y
```

Ví dụ :

```js
console.log(5 !== 10); //false, vì khác giá trị nhưng cùng kiểu dữ liệu
console.log(5 !== '10'); //true
```

**_IV. Toán tử logic_**
Toán tử | Diễn tả
| - | - |
&& | phép và (toán tử && trong javascript) trả về true nếu 2 số hạng là true: `a && b`
\|\| | phép hoặc (toán tử hoặc trong javascript) trả về true nếu 1 trong 2 số hạng là `true  : a || b`
! | phủ định; `!a` trả về giá trị ngược với biểu thức a
