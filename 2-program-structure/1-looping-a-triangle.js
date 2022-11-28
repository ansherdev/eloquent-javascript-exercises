/* my solution */
let triangleElement = "";

while (triangleElement.length < 7) {
  triangleElement += "#";
  console.log(triangleElement);
}

/* book solution */
for (let line = "#"; line.length < 8; line += "#") {
  console.log(line);
}
