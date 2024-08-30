const arr = [1, 2, 3, 4, 5];
console.log('1) ', arr.slice(1, 3));

console.log('2) ', arr.slice(2));

let deleted = arr.splice(1, 3);
console.log('3) ', arr);

arr.splice(1, 0, ...deleted);
console.log('4) ', arr);

deleted = arr.splice(2);
console.log('5) ', arr);

arr.splice(2, 0, ...deleted);
console.log('6) ', arr);

alpha = ['X', 'Y', 'Z'];
arr.splice(2, 1, ...alpha);
console.log('7) ', arr);

arr.splice(2, 3, 3); //복원
console.log('8) ', [...arr.slice(0, 2), ...alpha, ...arr.slice(3, 5)]);
