var sum = 0;
for (let i = 1; i <= 100; i += 1) {
  sum = sum + i;
}
console.log("🚀 ~ for - sum:", sum);

sum = 0;
let i = 1;
while (i <= 100) {
  sum += i;
  i += 1;
}
console.log("🚀 ~ while - sum:", sum);

sum = 0;
i = 0;
do {
  i += 1;
  sum += i;
} while (i < 100);
console.log("🚀 ~ dowhile - sum:", sum);

if (sum > 0 && sum <= 10) {
  console.log("sum = ", sum);
} else if (sum > 10) {
  console.log("sum is over 10 : ", sum);
} else {
  console.log("sum is zero!");
}

console.log(sum > 10 ? "T" : "F");

const bloodType = "A";
let sports;
if (bloodType === "A") {
  sports = "사격";
} else if (bloodType === "B") {
  sports = "펜싱";
} else if (bloodType === "O") {
  sports = "배드민턴";
} else if (bloodType === "AB") {
  sports = "야구";
} else {
  sports = "운동";
}

console.log("🚀 ~ if - sports:", sports);

switch (bloodType) {
  case "A":
    sports = "사격";
    break;
  case "B":
    sports = "펜싱";
    break;
  case "O":
    sports = "배드민턴";
    break;
  case "AB":
    sports = "야구";
    break;
  default:
    sports = "운동";
}

console.log("🚀 ~ sw - sports:", sports);

console.log("---------------------------------------");
x = 5;
let ret = x === 1 ? "one" : x === 2 ? "two" : x === 3 ? "three" : "else";
console.log("🚀 ~ ret:", ret);

ret =
  (x === 1 ? "one" : "") ||
  (x === 2 ? "two" : "") ||
  (x === 3 ? "three" : "") ||
  "else";

console.log("🚀 ~ ret:", ret);

const alpha = ["zero", "one", "two", "three"];
console.log(alpha[x] || "else");
