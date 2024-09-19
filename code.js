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

  //return (Math.log(vertices + 2) / 1.5).toFixed(2);
  return ((vertices +2)/4).toFixed(3);
};

var randomInt = function (max, min) {
  let minV = Math.ceil(min);
  let maxV = Math.floor(max);
  return Math.floor(Math.random() * (maxV - minV + 1)) + minV;
};

const colorPixel = (xCord, yCord, vertices, size, context) => {
      context.fillStyle = `rgb(
      ${255 * vertices}
      ${255 * vertices}
      ${255 * vertices})`;
      context.fillRect(xCord*10, yCord*10, size, size);
}

let gradients = {};
let memory = {};

let grid = [];
const nodes = 100;

for (let rowIndex = 0; rowIndex < nodes; rowIndex++) {
  const row = [];
  for (let rowEntryIndex = 0; rowEntryIndex < nodes; rowEntryIndex++) {
    row.push(NewRandomVector());
  }
  grid.push(row);
}
window.onload = () => {
  const myCanvas = document.getElementById("cnvs");
  myCanvas.width = nodes * 10;
  myCanvas.height = nodes * 10;
  const context = myCanvas.getContext("2d");

  grid.forEach((row, xIndex) => {
    let rowString = "";

    /*
    let pixelData = context.getImageData(0, 0, myCanvas.width, myCanvas.height);
    let pixel = pixelData.data;

    pixel[0] = randomInt(255, 0);
    pixel[1] = randomInt(255, 0);
    pixel[2] = randomInt(255, 0);
    pixel[3] = randomInt(255, 0);

    context.putImageData(pixelData, 0, 0);
    */

    row.forEach((coord, yIndex) => {
      const vertices = PerlinGet(coord.x, coord.y);
      rowString += " | " + vertices;
      colorPixel(xIndex, yIndex,vertices, nodes, context)
    });
    const newDiv = document.createElement("div");

    let data = document.createTextNode(rowString);
    newDiv.appendChild(data);
    const testDiv = document.getElementById("THETESTID");
    console.log(document);
    if (testDiv) {
      document.body.insertBefore(newDiv, testDiv);
    }
  });
};
