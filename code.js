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

const quintic = (x) => {
  return x ** 3 * (10 + x * (-15 + x * 6));
};

const cubic = (x) => {
  return x * x * (3.0 - x * 2.0);
};

const LinearInterpolation = (x, a, b) => {
  return a + SmoothStep(x) * (b - a);
};

const PerlinGet = (xInput, yInput) => {
  if (memory.hasOwnProperty([xInput, yInput])) {
    return memory[[xInput, yInput]];
  }
  const xFlat = Math.floor(xInput);
  const yFlat = Math.floor(yInput);

  // get the four corners
  const topLeft = DotProdgradients(xInput, yInput, xFlat, yFlat);
  const topRight = DotProdgradients(xInput, yInput, xFlat + 1, yFlat);
  const bottomLeft = DotProdgradients(xInput, yInput, xFlat, yFlat + 1);
  const bottomRight = DotProdgradients(xInput, yInput, xFlat + 1, yFlat + 1);

  const topLinearInterpolation = LinearInterpolation(
    xInput - xFlat,
    topLeft,
    topRight
  );

  const bottomLinearInterpolation = LinearInterpolation(
    xInput - xFlat,
    bottomLeft,
    bottomRight
  );

  const vertices = LinearInterpolation(
    yInput - yFlat,
    topLinearInterpolation,
    bottomLinearInterpolation
  );

  //return (Math.log(vertices + 2) / 1.5).toFixed(2);
  const newVer = (vertices + 2) / 4;
  //return newVer;
  // memory[[xInput, yInput]] = newVer;
  return vertices;
};

var randomInt = function (max, min) {
  let minV = Math.ceil(min);
  let maxV = Math.floor(max);
  return Math.floor(Math.random() * (maxV - minV + 1)) + minV;
};

const colorPixel = (xCord, yCord, vertices, size, context) => {
  context.fillStyle = `rgb(${randomInt} ${randomInt} ${randomInt})`;
  /*
  context.fillStyle = `rgb(
      ${255 * vertices}
      ${255 * vertices}
      ${255 * vertices})`;
      */
  context.fillRect(xCord, yCord, size, size);
};

let gradients = {};
let memory = {};

//const nodes = 100;
/*
for (let rowIndex = 0; rowIndex < nodes; rowIndex++) {
  const row = [];
  for (let rowEntryIndex = 0; rowEntryIndex < nodes; rowEntryIndex++) {
    row.push(NewRandomVector());
  }
  grid.push(row);
}
  */
window.onload = () => {
  const myCanvas = document.getElementById("cnvs");
  myCanvas.width = 512;
  myCanvas.height = 512;
  const ctx = myCanvas.getContext("2d");

  const myCanvas2 = document.getElementById("cnvsBW");
  myCanvas2.width = 512;
  myCanvas2.height = 512;
  const ctx2 = myCanvas2.getContext("2d");

  const GRID_SIZE = 4 * 1;
  const RESOLUTION = 128 / 1;
  const COLOR_SCALE = 255;

  let pixel_size = myCanvas.width / RESOLUTION;
  let num_pixels = GRID_SIZE / RESOLUTION;

      const range = new Set([])
  for (let y = 0; y < GRID_SIZE; y += num_pixels / GRID_SIZE) {
    for (let x = 0; x < GRID_SIZE; x += num_pixels / GRID_SIZE) {
      let purev = (PerlinGet(x, y) )
      let v = parseInt(purev * COLOR_SCALE);
      ctx.fillStyle = "hsl(" + v + ",50%,50%)";
      ctx2.fillStyle = `rgb(${v} ${v} ${v})`;
      range.add(purev)
      ctx.fillRect(
        (x / GRID_SIZE) * myCanvas.width,
        (y / GRID_SIZE) * myCanvas.width,
        pixel_size,
        pixel_size
      );
      ctx2.fillRect(
        (x / GRID_SIZE) * myCanvas.width,
        (y / GRID_SIZE) * myCanvas.width,
        pixel_size,
        pixel_size
      );
    }
  }

  const rangeArray = [...range]
  const max = rangeArray.reduce((max, v) => max >= v ? max : v, -Infinity)
  const min = rangeArray.reduce((min, v) => min <= v ? min : v, Infinity)
  const sum = rangeArray.reduce((a,b) => a + b, 0)
  const avg = (sum/rangeArray.length)
  console.log("max is "+ max)
  console.log("min is " + min)
  console.log("aveage is " + avg)
};
