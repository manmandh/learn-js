####Mảng trong JS
Khác với các ngôn ngữ như Java, C++,... mảng là tập hợp các phần tử _cùng kiểu dữ liệu_, nhưng trong Javascipt, mảng có thể là tập hợp bất cứ kiểu dữ liệu nào mà phần tử có thể không cùng 1 loại kiểu dữ liệu

Ví dụ :

```js
let arr = [1, '2', true];
```

######Cách khai báo mảng

- Khai báo bằng dấu [...]

```js
let arr = [1, 2, 3, 4];
let arr2 = ['man', 'tran'];
let objectArray = [
  { x: 1, y: 2 },
  { x: 4, y: 4 },
];
```

- Khai báo bằng từ khoá `new Array`

```js
let arr = new Array(1, 2, 3, 4);
let arr2 = new Array('man', 'tran');
let objectArray = new Array({ x: 1, y: 2 }, { x: 4, y: 4 });
```

######Truy cập phần tử của mảng

- Sử dụng [...]

```js
console.log(arr[1]); //2
console.log(arr2[0]); //man
```

- Dùng .at

```js
console.log(arr.at(1)); //2
```

> Khi truy cập tới phần tử không tồn tại sẽ trả về undefined

Ví dụ :

```js
console.log(a[4]); //undefined
```

Ngoài ra, có thể gán giá trị của vị trí không có sẵn bằng giá trị khác, ví dụ

```js
let arr = [1, 2, 3];
arr[3] = 4;
```

Khi đó mảng arr sẽ có :
`1 2 3 4`

- Nhưng nếu khai báo arr[5] thì các giá trị trước đó sẽ như thế nào?

Khi đó `arr[4], arr[3] `sẽ có giá trị là undefined nhưng khi dùng arr.length để lấy độ dài mảng thì thấy tăng lên 3 phần tử ( =6 )

####Thao tác với mảng :
Giả sử có mảng :

```js
let arr = [1, 2, 3];
```

######- Chèn phần tử vào mảng :

1. Dùng push để chèn vào cuối mảng

```js
arr.push(2); //1,2,3,2
arr.push(1, 1, 1); //1,2,3,2,1,1,1
```

2. Dùng toán tử ...

```js
arr = [...arr, 4]; //1,2,3,2,1,1,1,4
arr = [...arr, 1, 2]; //1,2,3,1,1,1,4,1,2
```

3. Khai báo thêm gía trị cho phần tử thứ arr.length

```js
arr[arr.length] = 2; //1,2,3,1,1,1,4,1,2,2
```

4. Chèn phần tử của mảng b vào cuối mảng a

```js
let b = [1, 2, 3];
let a = [0];
a.push(b); //sai, nếu như này, cả mảng b sẽ được push vào mảng a chứ không phải push từng phần tử
a.push(...b); //đúng, push các giá trị của b vào a
```

5. Chèn phần tử vào đầu mảng dùng `unshift(items)`

```js
let arr1 = [1, 2];
arr1.unshift(3); //3,1,2
```

6. Chèn hoặc xoá sử dụng splice

Cú pháp

```js
array.splice(startIndex, deleteCount, items) > return arr
```

`startIndex`: Vị trí bắt đầu để thay đổi mảng.
`deleteCount`: tổng số phần tử muốn xóa.
`items`: phần tử thêm vào mảng.
`arr` : Trả về danh sách bị xoá , thêm
Ví dụ :

```js
let arr = [1, 2, 3];
arr = arr.splice(arr.length, 0, 1, 2, 3); //chèn tử vị trí thứ 3
```

7. Ghép 2 mảng vào 1 mảng mà không thay đổi mảng gốc

- Sử dụng `concat(itemList)`

```js
let arr = [1, 2, 3];
let b = [4, 5, 6];
let c = arr.concat(b);
```

- Sử dụng spread

```js
let c = [...arr, ...b];
```

######- Xoá phần tử ở mảng

1. Dùng `pop()` để xoá phần tử cuối mảng

```js
let arr = [1, 2, 3];
arr.pop(); //1,2
```

2. Đặt lại độ dài của mảng

```js
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr.length = 3;
console.log(arr); //1,2,3
```

3. Dùng `shift` để xoá phần tử ở đầu mảng

```js
let arr = [1, 2, 3];
arr.shift();
console.log(arr); //2,3
```

4. Dùng `splice` nói ở phần trên

```js
let a = [1, 2, 3, 4, 5];
a.splice(1, 3); //1,5
```

5. Dùng delete xoá mà không ảnh hưởng độ dài

```js
delete arr[3];
```
