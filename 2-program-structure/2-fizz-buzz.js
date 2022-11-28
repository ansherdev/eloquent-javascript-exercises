/* my solution */
const fizzBuzz = (n) => {
  for (let i = 0; i < n; i++) {
    const isFizz = i % 3 === 0;
    const isBuzz = i % 5 === 0;

    if (isFizz && isBuzz) {
      console.log("FizzBuzz");
    } else if (isFizz) {
      console.log("Fizz");
    } else if (isBuzz) {
      console.log("Buzz");
    } else {
      console.log(i);
    }
  }
};

fizzBuzz(100);

/* book solution */
for (let n = 1; n <= 100; n++) {
  let output = "";
  if (n % 3 == 0) output += "Fizz";
  if (n % 5 == 0) output += "Buzz";
  console.log(output || n);
}
