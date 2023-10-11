####Object
Đối tượng trong javascript

- Cách khởi tạo dùng new Object:

```js
let obj = new Object(); //khởi tạo object
obj.color = 'red'
obj.shape = 'circle'
...
//bổ sung thuộc tính cho object
obj.setColor = function(color){
    this.color = color
}
//có thể làm 1 hàm
```

Có thể hiểu object khá giống class trong OOP của các ngôn ngữ như PHP,Java,...

- Sử dụng cú pháp {}

```js
let ob = {}; //khởi tạo object rỗng
ob.name = 'man'; //thêm thuộc tính

let obj = {
  color: 'red',
  shape: 'circle',
  setColor: (color) => {
    this.color = color;
  },
};
```

Khi gọi `obj.setColor('blue')`, giá trị của obj.color sẽ bằng blue

`this` để chỉ tới thuộc tính có trong object
