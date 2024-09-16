// Random
const NewRandomVector = () => {
  const randomNumber = Math.random() * 2 * Math.PI;
  // The math sin and cos are used as the number we are making should equal one
  // when squared and added together.
  return { x: Math.cos(randomNumber), y: Math.sin(randomNumber) };
};

// Math functions
const DotProdgradients = (x1, y1, x2, y2) => {
  var firstVector;
  var secondVector = { x: x1 - x2, y: y1 - y2 };
  if (gradients[[x2, y2]]) {
    firstVector = gradients[[x2, y2]];
  } else {
    firstVector = NewRandomVector();
    gradients[[x2, y2]] = firstVector;
  }
  return secondVector.x * firstVector.x + secondVector.y * firstVector.y;
};

const SmoothStep = (x) => {
  return 6 * x ** 5 - 15 * x ** 4 + 10 * x ** 3;
};

const LinearInterpolation = (x, a, b) => {
  return a + SmoothStep(x) ** 3 * (b - a);
};

const PerlinGet = (xInput, yInput) => {
  const xFlat = Math.floor(xInput);
  const yFlat = Math.floor(yInput);

  // get the four corners
  const topLeft = DotProdgradients(xInput, yInput, xFlat, yFlat);
  const topRight = DotProdgradients(xInput, yInput, xFlat, yFlat);
  const bottomLeft = DotProdgradients(xInput, yInput, xFlat, yFlat);
  const bottomRight = DotProdgradients(xInput, yInput, xFlat, yFlat);

  const topLinearInterpolation = LinearInterpolation(
    xInput - xFlat,
    topLeft,
    topRight
  );

  const bottomLinearInterpolation = LinearInterpolation(
    yInput - yFlat,
    bottomLeft,
    bottomRight
  );

  const vertices = LinearInterpolation(
    yInput - yFlat,
    topLinearInterpolation,
    bottomLinearInterpolation
  );

  return vertices;
};

let gradients = {};
let memory = {};

let grid = [];
const nodes = 10;

for (let rowIndex = 0; rowIndex < nodes; rowIndex++) {
  const row = [];
  for (let rowEntryIndex = 0; rowEntryIndex < nodes; rowEntryIndex++) {
    row.push(NewRandomVector());
  }
  grid.push(row);
}
grid.forEach((row) => {
  let rowString = "";
  row.forEach((coord) => {
    rowString += " " + PerlinGet(coord.x, coord.y) + " ";
  });
  let newDiv = document.createElement("div");

  newDiv.appendChild(rowString);

  const testDiv = document.getElementById("test");
  document.body.insertBefore(newDiv, testDiv);
  console.log(rowString);
});

alert("hello");
