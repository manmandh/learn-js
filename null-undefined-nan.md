###1. NULL

> Null đại diện cho tham chiếu của một object không tồn tại hoặc không có giá trị

- Phủ định của null là true

```js
!null === true;
```

- Bảng chân lý :
  `null == false => false`
  `null == true => false`
  `null == undefined => true`

> Trong phép toán cơ bản, null có giá trị là 0
> `null * 5 == 0` > `null + 5 == 5` > `null / 5 == 0 `

```js
typeof null == object;
```

###2. Undefined

> Đại diện cho giá trị ban đầu khi khởi tạo, chưa xác định được

```js
typeof undefined; //undefined
```

```js
var a; //undefined
```

- Phủ định của undefined là true

```js
!undefined === true;
```

- Bảng chân lý :

```js
undefined == false => false
undefined == true => false
undefined == undefined => true
undefined == null => true
undefined === null => false
undefined == NaN => false
```

- Khi thực hiện phép toán : _kết quả trả về luôn là NaN_
  Ví dụ :

```js
undefined / 5 == NaN;
undefined + 5 == NaN;
undefined - 5 == NaN;
```

###Vậy điểm khác biệt là gì? null vs undefined
**_Giống nhau:_**

- Cả hai khi bị phủ nhận đều tra về true, nhưng không có cái nào bằng true hoặc false.

- Chúng đều đại diện cho một cái gì đó không tồn tại…

**_Khác nhau:_**

- null đại diện cho “nothing”, hoàn toàn không tồn tại, không xác định được thứ không được xác định.
- undefined thì có dạng data của riêng nó (undefined), null thì chỉ là một object
- null đưa về 0 khi vận hành bằng toán, undefined trả về NaN
