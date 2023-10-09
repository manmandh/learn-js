var fullname = 'Tran Man Man';
function showFullName() {
  console.log(fullname);
  //có thể truy cập
}
showFullName(); //in ra Tran Man Man
console.log(fullname); //in ra Tran Man Man

function showLastName() {
  var name = 'Man';
  console.log(name);
}

showLastName; // in ra Man
console.log(name); //báo lỗi vì không thấy biến name vì name chỉ có thể truy cập trong function

var fullName = 'Man';
var fullName = 'kyt';
console.log(fullName); //kyt

let x = 5;
if (true) {
  let x = 10;
  console.log(x); // in ra 10
}
console.log(x); // in ra  5

const PI = 3.14159;
console.log(PI); // Output: 3.14159

PI = 3.14; // Loi: ko doi
