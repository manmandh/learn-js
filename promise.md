## Promise

Xử lý bất đồng bộ trong JS

Javascript là ngôn ngữ bất đồng bộ, bên cạnh lợi ích xử lý tác vụ nhanh, thì còn có những bất tiện
- Tình huống :
> Giả sử cần thực hiện công việc nào đó sau khi hoàn thành 1 công việc trước đó thành công
Ví dụ : Lấy dữ liệu từ API, sau đó hiện lên ( phải chờ dữ liệu được lấy về trước)

Ví dụ :
```js
setData3(data3,
    getData2(data2,
        getData1(data1,...)
    )
)
```

Dữ liệu được lấy từ data 1 => data 2 => data3

Khi đó, gặp tình trạng callback hell vì gọi các hàm bên trong liên tiếp, gây rối

Vì vậy sinh ra Promise để xử lý các tác vụ bất đồng bộ

####Cú pháp :
```js
var getData = new Promise(callback_function(resolve,reject))
```

``getData`` : 1 đối tượng promise
``resolve`` : Tham số này là một hàm, gọi khi nhiệm vụ thực thi thành công
``reject`` : Tham số này là một hàm, gọi khi nhiệm vụ thực thi thất bại

#####Promise có 3 trạng thái :
- Pending (đang xử lý)
- Fulfilled (đã hoàn thành)
- Rejected (đã bị từ chối)

Giả sử : Muốn in ra 4 sau 4s
```js
var delay = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve() //thành công
    },4000)
})

delay.then(() =>
{
    console.log("4")
}).catch(() => {

}).finally(() =>{

})
```

Khi ``resolve()`` được gọi, sẽ thực thi code trong ``then``
Khi ``reject()`` được gọi, sẽ thực thi code trong ``then``
``finally()`` sẽ chạy khi một trong 2 hàm trên được gọi

- ``resolve()`` và ``reject()`` có thể trả về dữ liệu và nhận ở ``then()`` hoặc ``catch()``

Ví dụ :
```js
var delay = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve(1) //thành công
    },4000)
})

delay.then((num) =>
{
    console.log(num) //in ra 1 sau 4s, lấy từ resolve
}).catch(() => {

}).finally(() =>{

})
```

Giả sử trả về ``reject`` :
```js
var delay = new Promise((resolve,reject) => {
    setTimeout(() => {
        reject() //thành công
    },4000)
})

delay.then(() =>
{
    console.log("4")
}).catch(() => {
    console.log("That bai")
}).finally(() =>{

})
//in ra That bai sau 4s vì reject được gọi
```

- Nếu có nhiều ``.then``, giá trị trả về của ``then`` trước đó sẽ là tham số của ``then`` sau

Ví dụ :
```js
var delay = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve(1) //thành công
    },1000)
})

delay.then((num) =>
{
    console.log(num) //1
    return 2
}).then((so) => {
    console.log(so) //2
})
.catch(() => {

}).finally(() =>{

})
```

Giả sử, muốn in đếm ngược 2,1,0
```js
const delay1s = () => {
    return new Promise((resolve,reject) => {
        setTimeout(() => { 
            resolve() 
} //hàm trả về promise

var num = 2

delay1s()
    .then(() => {
        console.log(num--)
        return delay1s()
    })
    .then(() => {
        console.log(num--)
        return delay1s()
    }).
    .then(() => {
        console.log(num--)
        return delay1s()
    }).catch((err) => {
        console.log("Co loi : " + err)
    })
```

Giả sử trong ``.then return Promise()``, nếu Promise đó reject sẽ được bắt lỗi ở ``catch()``

Ở ví dụ trên, giả sử thay``return delay1s`` bằng ``return new Promise`` và tạo 1 promise mới, khi promise đó bị reject, sẽ chuyển tới catch của cả promise đang chạy

- Ví dụ 1 promise request API :
```js
if (window.Promise) {
  console.log('Promise found');

  var promise = new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();

    request.open('GET', 'https://');
    request.onload = function() {
      if (request.status == 200) {
        resolve(request.response); // we got data here, so resolve the Promise
      } else {
        reject(Error(request.statusText)); // status is not 200 OK, so reject
      }
    };

    request.onerror = function() {
      reject(Error('Error fetching data.')); // error occurred, reject the  Promise
    };

    request.send(); //send the request
  });

  console.log('Asynchronous request made.');

  promise.then(function(data) {
    console.log('Got data! Promise fulfilled.');
    document.getElementsByTagName('body')[0].textContent = JSON.parse(data).value.joke;
  }, function(error) {
    console.log('Promise rejected.');
    console.log(error.message);
  });
} else {
  console.log('Promise not available');
}

```

###Một số phương thức khác của Promise
- ``Promise.resolve`` : Trả về 1 promise luôn thành công
Tức là :
```js
let pro1 = new Promise((resolve) => {
    resolve()
})

//giống với
let pro1 = Promise.resolve()

pro1.then(() => {
    console.log("success")
})
```
- ``Promise.reject`` tương tự trên, luôn trả về Promise thất bại

- ``Promise.all(arrayOfPromise)`` : Chạy đồng thời nhiều Promise, kết quả trả về là 1 ``promise`` với tham số truyền vào ``.then`` là một mảng
```js
//vd1
const timeOut = (t) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Completed in ${t}`);
    }, t);
  });
};
```
Ví dụ 2 :
```js
const durations = [1000, 2000, 3000];

Promise.all(durations.map((duration) => timeOut(duration))).then((response) =>
  console.log(response)
);

//vd2
Promise.all([Promise1, Promise2, Promise3])
  .then((result) => {
    console.log(result);
  })
  .catch((error) => console.log(`Error in promises ${error}`));
```
Nếu 1 trong các ``promise`` bị reject, sẽ chạy ngay tới catch của Promise all

####Có 1 số vấn đề khi sử dụng Promise.all như sau:

- Làm sao để tạo 1 mảng Promise sử dụng map
Nếu muốn tất cả các Promise con thực hiện xong mà không bị dừng bị 1 trong các Promise khác thì làm sao?

- Nếu muốn chỉ 1 trong các Promise con thực hiện xong (resolve) là hủy các Promise còn lại thì làm sao?

- Nếu muốn chỉ 1 trong các Promise con trả về (bất kể resolve hay reject) là hủy các Promise còn lại thì làm sao?

#### ``Promise.allSettled``
```js
Promise.allSettled([
  Promise.reject("This failed."),
  Promise.reject("This failed too."),
  Promise.resolve("Ok I did it."),
  Promise.reject("Oopps, error is coming."),
]).then((res) => {
  console.log(`Here's the result: `, res);
});
```

Tương tự ``Promise.all``, ``Promise.allSettled`` sẽ chạy tất cả các ``Promise`` và chờ tất cả được chạy xong, kể cả có ``Promise`` lỗi thì vẫn tiếp tục chạy tới khi tất cả đều xong


##Promise.race và Promise.any
Giả sử chúng ta có 2 bài toán như sau, các bạn hãy xem và lựa chọn các dùng nào của Promise nhé.

> Bài toán 1: có 3 API get thông tin thời tiết và trả về kết quả như nhau, do vậy chỉ cần gọi 1 trong 3 API, cái nào có kết quả là được; không cần gọi tất cả 3 cái. Chúng ta sẽ làm thế nào?

> Bài toán 2: chức năng upload cần upload file lên 3 server khác nhau và phải đảm bảo việc upload thực hiện thành công trên cả 3 server, nếu 1 trong 3 task fail thì dừng luôn 2 task còn lại.

- Để giải quyết 2 bài toán trên, JavaScript cung cấp thêm cho chúng ta 2 function nữa là Promise.race và Promise.any. Promise.race và Promise.any có điểm chung là đều sẽ hoàn thành (resolve) khi 1 trong các promise con được thực hiện xong. Như ví dụ bài toán 1, nếu có 1 API get thông tin thời tiết hoàn thành xong thì nếu dùng Promise.race hoặc Promise.any, 2 API get thông tin thời tiết còn lại sẽ không cần thực hiện nữa.
</br>
- Điểm khác nhau giữa race và any là ở trường hợp reject: any sẽ chỉ reject khi tất cả các promise con reject (hay không có promise nào trả về resolve); còn race sẽ reject khi chỉ cần 1 promise con reject. Điều này giúp Promise.race giải quyết bài toán thứ 2 ở trên. Khi có 1 trong 3 task upload file lên server thất bại thì sẽ dừng luôn 2 task còn lại.
