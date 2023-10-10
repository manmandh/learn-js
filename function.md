## Hàm trong Javascript

##### Tạo hàm :

- Cách thông thường

```js
function tên_hàm(a,b,c,...danh sách tham số){
    //xử lý
    return __ //giá trị trả về
}
```

Ví dụ hàm tính bình phương :

```js
function square(number) {
  return number * number;
}
```

- Định nghĩa hàm bằng expressions

```js
const square = function (number) {
  return number * number;
};
```

- Định nghĩa bằng arrow function

```js
const square = (number) => {
  return number * number;
};
```

Nếu tham số truyền vào là một object, hàm có thể thay đổi giá trị, các thuộc tính của object...

```js
function myFunc(theObject) {
  theObject.make = 'Toyota';
}

const mycar = {
  make: 'Honda',
  model: 'Accord',
  year: 1998,
};

console.log(mycar.make); // "Honda"
myFunc(mycar);
console.log(mycar.make); // "Toyota"
```

Tương tự với mảng :

```js
function myFunc(theArr) {
  theArr[0] = 30;
}

const arr = [45];

console.log(arr[0]); // 45
myFunc(arr);
console.log(arr[0]); // 30
```

#### Phạm vi truy cập :

Hàm không thể tiếp cận các biến bên ngoài, ví dụ :

```js
// The following variables are defined in the global scope
const num1 = 20;
const num2 = 3;
const name = 'Hieu';

// This function is defined in the global scope
function multiply() {
  return num1 * num2;
}

console.log(multiply()); // 60

// A nested function example
function getScore() {
  const num1 = 2;
  const num2 = 3;

  function add() {
    return `${name} scored ${num1 + num2}`;
  }

  return add();
}

console.log(getScore()); // "Hieu scored 5"
```

##### Trong hàm có thể chứa hàm

Lưu ý : Phạm vi truy cập của hàm con chỉ ở trong hàm cha

Ví dụ :

```js
function addSquares(a, b) {
  function square(x) {
    return x * x;
  }
  return square(a) + square(b);
}

console.log(addSquares(2, 3)); // 13
console.log(addSquares(3, 4)); // 25
console.log(addSquares(4, 5)); // 41
```

Có thể gọi hàm con qua hàm cha :

```js
function outside(x) {
  function inside(y) {
    return x + y;
  }
  return inside;
}

const fnInside = outside(3); // Think of it like: give me a function that adds 3 to whatever you give it
console.log(fnInside(5)); // 8
console.log(outside(3)(5)); // 8
```

#### Tham số mặc định

```js
function multiply(a, b = 1) {
  return a * b;
}

console.log(multiply(5)); // 5
```

#### Rest parameter

Cho phép truyền số lượng tham số tuỳ ý, ví dụ:

```js
function multiply(multiplier, ...theArgs) {
  return theArgs.map((x) => multiplier * x);
  //ở đây theArgs dùng như 1 mảng
}

const arr = multiply(2, 1, 2, 3);
console.log(arr); // [2, 4, 6]
```

hay hàm tính tổng :

```js
function sum(...args) {
  // args is the name for the array
  let sum = 0;

  args.forEach((arg) => (sum += arg));

  return sum;
}

console.log(sum(1)); // 1
console.log(sum(1, 2)); // 3
console.log(sum(1, 2, 3)); // 6
```

Chú ý : rest parameter phải đặt ở cuối danh sách tham số, ví dụ lỗi :

```js
function f(arg1, ...rest, arg2) { // arg2 after ...rest ?!
  // error
}
```

#### Arguments

Cũng khá giống Rest Parameter, nhưng cách dùng hơi khác :

```js
function sum() {
  let total = 0;
  for (let argument of arguments) {
    total += argument;
  }
  return total;
}
sum(1, 2, 3); // 6
```

- Ở đây arguments là 1 object kiểu Arguments nên không thể forEach như mảng của rest
- Arguments không thể dùng trong arrow funtion

####Spread operator
Ở phần trên chúng ta đã biết được cách làm sao có thể lấy được giá trị từ danh sách các tham số truyền vào. Nhưng một số trường hợp ta lại cần làm thế nào để truyền tất cả các tham số được lấy ra từ mảng.

Lấy ví dụ với hàm Math.max trả về số lớn nhất trong danh sách

```js
console.log(Math.max(3, 5, 1)); // 5
```

Giờ ta có một array `[3, 5, 1]`, làm thế nào để lấy giá trị lớn nhất của array này ?

Truyền vào hàm đó array này như là 1 tham số sẽ không khả thi bởi vì hàm này yêu cầu tham số là tất cả các phần tử trong mảng, mỗi phần tử là một tham số riêng.

```js
let arr = [3, 5, 1];

console.log(Math.max(arr)); // NaN
```

Và như vậy chúng ta sửa lại như sau để chạy được

```js
Math.max(arr[0], arr[1], arr[2]);
```

Đoạn mã trên chạy đúng trong trường hợp này tuy nhiên nhìn nó khá là tệ, bởi vì nó không tổng quát khi số lượng phần tử của array không cố định

Thật tuyệt khi Javascript có Spread operator có thể giải quyết được vấn đề này một cách hoàn hảo.

Sử dụng ...arr khi gọi hàm max, nó sẽ biến các phần tử trong array arr thành danh sách các tham số .

Ví dụ

```js
let arr = [3, 5, 1];

console.log(Math.max(...arr)); // 5 (spread turns array into a list of arguments)
```

Chúng ta cũng có thể truyền nhiều spread operator vào hàm theo cách này

```js
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

console.log(Math.max(...arr1, ...arr2)); // 8
```

Chúng ta cũng có thể kết hợp các spread operator với các tham số thường

```js
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

console.log(Math.max(1, ...arr1, 2, ...arr2, 25)); // 25
```

###Closures
Closure định nghĩa là 1 hàm có thể truy cập các biến, thuộc tính,... của hàm chứa nó
Ví dụ :

```js
function ham_ben_ngoai() {
  var x = 10;

  function ham_ben_trong() {
    console.log(x); // 10
  }

  return ham_ben_trong;
}

let myFunc = ham_ben_ngoai();
myFunc(); // 10
```

Closure có 3 scope :

- Biến của chính hàm đó
- Biến của hàm chứa nó
- Biến của global

```js
function a() {
  var name = "I'm a Copy";
  function b() {
    // Closure
    console.log(name);
  }
}
```

Không chỉ có thể gọi biến của hàm ngoài, hàm bên trong còn có thể gọi tham số của hàm bên ngoài

```js
function showName(firstName, lastName) {
  var nameIntro = 'Your name is ';

  // Đây là hàm bên trong mà có thể truy cập đến biến của hàm bên ngoài, truy cập được tham số của hàm ngoài.
  function makeFullName() {
    return nameIntro + firstName + ' ' + lastName;
  }

  return makeFullName();
}

showName('Michael', 'Jackson'); // Your name is Michael Jackson
```
