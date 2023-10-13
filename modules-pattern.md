##Module pattern

> Module pattern (là một design pattern) trong javascript là phương pháp implement source code theo các modules riêng biệt với các ưu điểm như dễ mở rộng, giảm thiểu conflict khi làm việc theo nhóm, quản lý các biến local dễ hơn…

Ví dụ :

```js
function counter(initValue) {
  let currentValue = initValue;

  function increase(change) {
    currentValue += change;
  }

  function descrease(change) {
    currentValue -= change;
  }

  function getCurrentValue() {
    return currentValue;
  }

  return {
    current: currentValue,
    increase: increase,
    descrease: descrease,
    getCurrentValue: getCurrentValue,
  };
}

var c = counter(10);
console.log(c.current);
console.log(c.getCurrentValue()); // 10
c.increase(50);
console.log(c.getCurrentValue()); // 60
c.descrease(20);
console.log(c.getCurrentValue()); // 40
```

####Ở trong đây ta cần chú ý một số điều:

> Từ khóa let thì có ý nghĩa như khi ta đặt scope private cho một biến như trong các ngôn ngữ lập trình hướng đối tượng.
> Khi ta muốn truy cập đến các function của module thì các function đó phải được public ra bằng cách sử dụng từ khóa return.

### Sự kết hợp giữa IIFEs và Module pattern

Để chỉ có duy nhất một instance, ta sử dụng kết hợp giữa IIFEs và Module pattern => đây cũng chính là Singleton pattern. Ví dụ:

```js
var counter = (function () {
  var currentValue = 0;

  function initializeValue(initValue) {
    currentValue = initValue;
  }

  function getCurrentValue() {
    return currentValue;
  }

  function increase(change) {
    currentValue += change;
  }

  function descrease(change) {
    currentValue -= change;
  }

  return {
    initializeValue: initializeValue,
    getCurrentValue: getCurrentValue,
    increase: increase,
    descrease: descrease,
  };
})();

counter.initializeValue(10);
console.log(counter.getCurrentValue()); // 10
counter.increase(50);
console.log(counter.getCurrentValue()); // 60
counter.descrease(20);
console.log(counter.getCurrentValue()); // 40
```
