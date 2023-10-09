#Biến trong Javascript

> Ba cách khai báo biến trong JS và phạm vi ( Scope ) của chúng trong chương trình

<ol type="I">
    <li><a href="#var">Var</a></li>
    <li><a href="#let">Let</a></li>
    <li><a href="#const">Const</a></li>
</ol>

<h4 id="var">Var</h4>

_Cú pháp_ :

```js
var tên_biến;
```

Hoặc khởi tạo cùng giá trị

```js
var tên_biến = giá trị
```

- Phạm vi của biến khai báo bằng var :

  > Có thể truy cập ở nơi có cùng cấp bậc với nơi khai báo, hoặc bên trong ( cấp bé hơn, ví dụ trong function hoặc cách phần tử phía trong)

- Cập nhật biến

```js
var fullName = 'Tran Man Man';
fullName = 'TMM';
```

- Nếu sử dụng biến var mà chưa khai báo sẽ hiển thị undefined

```js
console.log(firstName); //in ra undefined
var firstName = 'Man';
```

Nếu không khai báo, chương trình chỉ như này :

```js
console.log(firstName); //in ra undefined
```

chương trình sẽ lỗi

```
Uncaught SyntaxError: Identifier 'firstName' has already been declared
```

###### Nội dung liên quan :

[Null, Undefined, NaN](./null-undefined-nan.md)
######Tại sao lại như vậy, sao lại undefined khi khai báo sau khi in ra mà không báo lỗi?
####Hoisting của var

Hoisting là một cơ chế của Javascript, khi mà ta khai báo một biến hoặc function thì chúng sẽ được đẩy lên đầu scope của chúng trước khi mã được thực thi. Dưới đây là ví dụ :

```js
console.log(greeter);
var greeter = 'say hello';
```

sẽ là

```js
var greeter; //có giá trị là undefined
console.log(greeter);
greeter = 'say hello';
```

Tức là khai báo biến đã được đảo lên đầu của scope...
Như vậy, thay vì báo lỗi, chương trình sẽ hiệu undefined là giá trị của greeter.

####Điểm yếu của var, lí do có let, const
Giả sử :

```js
var greeting = 'say Hi';
if (true) {
  var greeting = 'say Hello'; // biến greeting đã bị sửa từ say Hi thành say Hello
  console.log(greeting); // "say Hello "
}
console.log(greeting); // "say Hello" , bị sửa ròi
```

Giá trị greeter được cập nhật, giả sử bạn muốn bên trong 1 block tức là {} khởi tạo giá trị, làm việc với biến mà không ảnh hưởng gì tới biến bên ngoài :3 và đó, lí do Let ra đời...

<h4 id="let">Khai báo biến bằng Let</h4>
_Cú pháp_
```js
let tên_biến
```
hoặc
```
let tên_biến = giá trị
```
- Phạm vi truy cập (Scope)
> Phạm vi truy cập của biến let là block, tức là trong cùng {abc}

Ví dụ :

```js
function showName() {
  let fullName = 'Tran Man Man';
  console.log(fullName); //in ra Tran Man Man
}
showName();
console.log(fullName); //báo lỗi không tìm thấy biến
```

Ví dụ 2:

```js
function test() {
  let a = 'man';
  function tast() {
    console.log(man); //vẫn có thể truy cập vì vẫn trong block chứa biến let
  }
  tast();
  console.log(man);
}
test();
```

Output :

```js
man;
man;
```

Ví dụ 3:

```js
function test() {
  let a = 'man';
  function tast() {
    let str = 'man'; //vẫn có thể truy cập vì vẫn trong block chứa biến let
    console.log(str);
  }
  function tast2() {
    console.log(str); //lỗi vì không tìm thấy str, vì str chỉ có phạm vi trong hàm tast
  }
  tast();
  tast2();
  console.log(man); //vẫn truy cập đuợc
}
test();
```

- Cập nhật giá trị
  Như var, ta có thể khai báo lại biến, nhưng đối với let thì không :

```js
let name = 'Man';
let name = 'Tran';
```

Lỗi

```
Uncaught SyntaxError: Identifier 'name' has already been declared
```

thay vào đó, ta cập nhật :

```js
let name = 'Man';
name = 'Tran';
```

Nếu ta khai báo một biến trước đó và khai báo biến khác cùng tên nhưng trong phạm vi khác thì vẫn hợp lệ...

```js
let greeting = 'say Hi';
if (true) {
  let greeting = 'say Hello instead'; //biến greeting tạo mới khác với biến ở ngoài
  console.log(greeting); // "say Hello instead"
}
console.log(greeting); // "say Hi", không liên quan gì nhau hehhehe
```

Hai biến này khác nhau phạm vi nên không ảnh hưởng gì nhau đâu

Còn khi dùng như này :

```js
let greeting = 'say Hi';
if (true) {
  greeting = 'say Hello'; // biến greeting này là biến ở ngoài, và vẫn có thể tiếp cận, vì thế giá trị greeting đã bị sửa từ say Hi thành say Hello
  console.log(greeting); // "say Hello "
}
console.log(greeting); // "say Hello" , bị sửa ròi
```

######Hoisting của let

Cũng giống var, khi ta khai báo một biến let thì nó cũng sẽ được đẩy lên đầu. Nhưng lưu ý, không giống var, khi khởi tạo thì var sẽ có giá trị là undefined. let không như vậy, nên nếu bạn cố dùng let trước khi khai báo, bạn sẽ gặp lỗi tham chiếu (Reference Error).

<h4 id="const">Const - hằng</h4>

- Cách khai báo

```js
const tên_biến = giá trị
```

> - Bắt buộc có giá trị ngay lúc khai báo
> - Không thể cập nhật giá trị

```js
const greeting = 'say Hi';
greeting = 'say Hello instead'; // error: Assignment to constant variable.
```

- Giống let về phạm vi, vẫn là block scope

Nhưng khi chúng ta khai báo các đối tượng với const, sẽ có một chút khác biệt. Một đối tượng const sẽ không thể update, nhưng các thuộc tính của nó thì lại có thể update. Dưới đây là ví dụ:

```js
const greeting = {
  message: 'say Hi',
  times: 4,
};
```

Chúng ta sẽ không thể làm như sau:

```js
greeting = {
  words: 'Hello',
  number: 'five',
}; // error:  Assignment to constant variable.
```

Thay vào đó:

```js
greeting.message = 'say Hello instead';
```

Bằng cách này chúng ta có thể update giá trị của greeting.message mà không bị lỗi.

|                    | var                                          | let                                                             | const                                                                                                                          |
| ------------------ | -------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Phạm vi            | Global                                       | Block Scope                                                     | Block Scope                                                                                                                    |
| Cơ chế hoisting    | đưa lên đầu nhưng được khởi tạo là undefined | đưa lên đầu nhưng không được khởi tạo                           | đưa lên đầu nhưng không được khởi tạo                                                                                          |
| Khai báo, cập nhật | Có thể khai báo, cập nhật giá trị nhiều lần  | Không thể khai báo nhiều lần, có thể câp nhật giá trị nhiều lần | Khai báo cần khởi tạo cùng với giá trị, không thể sửa đổi trực tiếp giá trị nhưng có thể thay đổi thuộc tính trong biến object |
